import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Lazy load Gemini Client safely
let aiClient: GoogleGenAI | null = null;
const getGeminiClient = () => {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in env variables. Mock AI content will be served.");
    return null;
  }
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
  return aiClient;
};

// API: Fashion consultation / AI Stylist Guidance
app.post("/api/styling", async (req, res) => {
  try {
    const { name, preferredStyle, bodyType, occasion, currentPick } = req.body;
    const ai = getGeminiClient();
    
    // Fallback if API Key not provided or offline
    if (!ai) {
      return res.json({
        greeting: `Bonjour ${name || "Cheri"}! StyleP welcomes you.`,
        stylingTip: `Thank you for choosing StyleP! To provide custom luxury advice tailored to your silhouette (${bodyType || "Classic Tailored"}) and your upcoming event (${occasion || "Chic Evening Soiree"}), please configure your GEMINI_API_KEY. Until then, our tip is to prioritize premium organic silk and structured double-breasted blazers. Pair gold statement accessories for timeless sophistication.`,
        idealColorPalette: [
          { name: "Saffron Gold", hex: "#D4AF37" },
          { name: "Alabaster White", hex: "#F5F5F5" },
          { name: "Obsidian Black", hex: "#111111" }
        ],
        outfitFormula: `Tailored structured wool blazer draped over an ultra-fine silk slip dress, accented with a 24k gold necklace and leather stiletto boots.`,
        vibeCheck: `Symmetry in silhouette creates immediate visual presence.`
      });
    }

    const prompt = `You are the lead luxury fashion designer for Haute Couture house "StyleP".
A client named ${name || "Guest"} is seeking personalized, premium styling guidance.
Here is the client's profile:
- Preferred Style/Aesthetic: ${preferredStyle || "Modern Luxury Minimalist"}
- Occasion / Event: ${occasion || "Premium Gala/Cocktail Partye"}
- Desired Silhouette/Body Preference: ${bodyType || "Classic Structured"}
${currentPick ? `- Current selected collection piece of interest: ${currentPick}` : ""}

Please craft a luxury-brand recommendation for this client.
Format your response as a single, valid JSON object with the following exact keys:
1. "greeting": An elegant, customized greeting in French-chic style (e.g. "Bonjour, [Name] chéri!...")
2. "stylingTip": A professional fashion consultation tip (about 2 paragraphs) analyzing their selected occasion and profile. Focus on tailored details, fabric choice, drape, and modern trends.
3. "idealColorPalette": An array of exactly 3 objects. Each object must have a "name" property (e.g. "Warm Terracotta") and a "hex" property (e.g. "#C2B280") that represents a complementary color for this luxurious look.
4. "outfitFormula": A complete matching outfit combo representing their refined vision (e.g., custom double-breasted blazer, raw linen trousers, gold geometric cuffs).
5. "vibeCheck": A bold, inspiring fashion-confidence phrase (e.g. "To wear StyleP is to wear confidence as your primary texture.")

Return ONLY a raw JSON string of this object. Ensure it is correct JSON. Do not wrap in markdown \`\`\`json blocks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.85,
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Empty response from AI Stylist");
    }

    const data = JSON.parse(textOutput.trim());
    return res.json(data);
  } catch (error: any) {
    console.error("AI Stylist failed:", error);
    return res.json({
      greeting: "Bonjour! Elegant simplicity awaits.",
      stylingTip: "Our lead designers recommend structured monochrome lines and accent details to elevate your natural presence. Seek tailored premium knits or classic drapes.",
      idealColorPalette: [
        { name: "Champagne Gold", hex: "#E8D8B0" },
        { name: "Charcoal Charcoal", hex: "#222222" },
        { name: "Ivory", hex: "#FFFFF0" }
      ],
      outfitFormula: "Monochromatic silk set with an oversized gold accented belt.",
      vibeCheck: "Confidence is best styled with simplicity and raw passion."
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Vite/Static asset middleware setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[StyleP Server] Running on http://0.0.0.0:${PORT}`);
  });
});
