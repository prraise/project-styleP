import { useState, FormEvent } from "react";
import { X, Sparkles, Send, RefreshCw, Palette, HelpCircle, AlertCircle } from "lucide-react";
import { StylingResult, Product } from "../types";

interface AIAdvisorModalProps {
  onClose: () => void;
  products: Product[];
  onOpenQuickView: (product: Product) => void;
}

export default function AIAdvisorModal({ onClose, products, onOpenQuickView }: AIAdvisorModalProps) {
  const [name, setName] = useState("");
  const [preferredStyle, setPreferredStyle] = useState("Modern Luxury Minimalist");
  const [bodyType, setBodyType] = useState("Classic Tailored");
  const [occasion, setOccasion] = useState("");
  const [selectedPiece, setSelectedPiece] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StylingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const presetAesthetics = [
    "Modern Luxury Minimalist",
    "Avant-Garde Streetwear",
    "Parisian Elite Chic",
    "Corporate Executive Power",
    "Resort/Yacht Loungewear",
  ];

  const presetSilhouettes = [
    "Classic Tailored",
    "Relaxed Oversized Drop",
    "Structured Hourglass",
    "Athletic Slim Cut",
  ];

  const handleConsultation = async (e: FormEvent) => {
    e.preventDefault();
    if (!occasion.trim()) {
      setErrorMsg("Please specify an upcoming occasion, event, or mood.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      const response = await fetch("/api/styling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          preferredStyle,
          bodyType,
          occasion: occasion.trim(),
          currentPick: selectedPiece,
        }),
      });

      if (!response.ok) {
        throw new Error("Styling connection timed out.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to reach StyleP design room. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-advisor-overlay" className="fixed inset-0 z-55 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      {/* Container */}
      <div className="bg-white dark:bg-neutral-950 max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl border border-gray-100 dark:border-neutral-900 flex flex-col md:flex-row text-gray-950 dark:text-gray-100 max-h-[92vh] md:max-h-[85vh]">
        
        {/* Header Close button */}
        <button
          id="close-ai-advisor-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-150 hover:bg-gray-250 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-gray-500 hover:text-black dark:hover:text-white rounded-full p-2 transition-colors"
          aria-label="Close Stylist Consultation"
        >
          <X size={16} />
        </button>

        {/* Left column: Consultation form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 border-r border-gray-100 dark:border-neutral-900 overflow-y-auto">
          
          <div className="flex items-center space-x-2 text-[#D4AF37] mb-3">
            <Sparkles size={20} className="animate-pulse" />
            <h3 className="font-display text-lg tracking-widest uppercase font-bold">
              AI Stylist Lounge
            </h3>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed mb-6">
            Welcome to the StyleP concierge. Submit your upcoming event parameters to receive high-end styling blueprints curated immediately by our intelligent server-side design coordinators.
          </p>

          <form onSubmit={handleConsultation} className="space-y-4 font-sans text-xs">
            
            {/* Input name */}
            <div>
              <label htmlFor="designer-name" className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                Your Formal Name (Optional)
              </label>
              <input
                id="designer-name"
                type="text"
                placeholder="e.g., Madame Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] text-gray-800 dark:text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Aesthetic Selector */}
            <div>
              <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                Target Aesthetic Style
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presetAesthetics.map((style) => (
                  <button
                    id={`aesthetic-btn-${style}`}
                    key={style}
                    type="button"
                    onClick={() => setPreferredStyle(style)}
                    className={`px-3 py-1.5 rounded transition-all border text-[10px] font-sans ${
                      preferredStyle === style
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-semibold"
                        : "border-gray-200 dark:border-neutral-800 text-gray-650 dark:text-gray-450 hover:border-gray-400"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Silhouette Selector */}
            <div>
              <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">
                Ideal Body Drape Fit
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presetSilhouettes.map((fit) => (
                  <button
                    id={`silhouette-btn-${fit}`}
                    key={fit}
                    type="button"
                    onClick={() => setBodyType(fit)}
                    className={`px-3 py-1.5 rounded transition-all border text-[10px] ${
                      bodyType === fit
                        ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-semibold"
                        : "border-gray-200 dark:border-neutral-800 text-gray-650 dark:text-gray-450 hover:border-gray-400"
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion / Event details */}
            <div>
              <label htmlFor="style-occasion" className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                Occasion / Vibe * (Required)
              </label>
              <textarea
                id="style-occasion"
                rows={2}
                placeholder="e.g. Winter product launch keynote in Switzerland, or beachside sunset anniversary dinner"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] text-gray-800 dark:text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Collection Outfit Link */}
            <div>
              <label htmlFor="advisor-linked-item" className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5">
                Incorporate Collection Piece (Optional)
              </label>
              <select
                id="advisor-linked-item"
                value={selectedPiece}
                onChange={(e) => setSelectedPiece(e.target.value)}
                className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] text-gray-800 dark:text-gray-100 cursor-pointer"
              >
                <option value="">No specific piece - design freely</option>
                {products.slice(0, 8).map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} (${p.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Error view */}
            {errorMsg && (
              <div id="ai-advisor-error" className="p-3 bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 rounded flex items-start space-x-2">
                <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                <span className="text-[11px] leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* Submit Action */}
            <button
              id="generate-ai-style-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <RefreshCw size={12} className="animate-spin" />
                  <span>Curating Blueprint...</span>
                </>
              ) : (
                <>
                  <Sparkles size={12} className="text-[#D4AF37]" />
                  <span>Create Style Blueprint</span>
                </>
              )}
            </button>

          </form>

        </div>

        {/* Right column: Results display panel */}
        <div className="w-full md:w-1/2 bg-gray-50 dark:bg-neutral-900 p-6 md:p-8 overflow-y-auto flex flex-col justify-center min-h-[350px] md:min-h-0 relative">
          
          {loading && (
            <div id="ai-advisor-loading" className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <Sparkles size={36} className="text-[#D4AF37] animate-spin duration-3000" />
                <div className="absolute inset-0 bg-[#D4AF37]/10 blur-xl rounded-full scale-110"></div>
              </div>
              <h4 className="font-display font-bold text-sm tracking-widest text-[#D4AF37] uppercase">
                Analyzing Silhouette & Occasion
              </h4>
              <p className="text-[11px] text-gray-400 font-sans max-w-xs leading-relaxed">
                "Our master coordinators are matching high-grade silks and wool profiles with your selected look parameters..."
              </p>
            </div>
          )}

          {!loading && !result && (
            <div id="ai-advisor-empty" className="h-full flex flex-col items-center justify-center text-center space-y-3 p-4">
              <HelpCircle size={40} className="text-gray-300 dark:text-gray-700" />
              <h4 className="font-display font-medium text-sm tracking-widest text-gray-450 uppercase">
                Bespoke Awaiting Draft
              </h4>
              <p className="text-[11px] text-gray-400 font-sans max-w-xs leading-relaxed">
                Configure your event on the left and trigger the styling coordinator to write a professional outfit blueprint.
              </p>
            </div>
          )}

          {!loading && result && (
            <div id="ai-advisor-result" className="space-y-6">
              
              {/* French style greeting */}
              <div className="border-b border-[#D4AF37]/20 pb-4">
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#D4AF37]">
                  StyleP Concierge Response
                </span>
                <h4 className="font-display text-lg font-bold text-[#D4AF37] italic mt-1 leading-snug">
                  {result.greeting}
                </h4>
              </div>

              {/* Consultation detail */}
              <div>
                <h5 className="font-sans text-[10px] uppercase text-gray-400 tracking-widest font-bold mb-1.5 flex items-center space-x-1">
                  <span>Stylist Consultation</span>
                </h5>
                <p className="text-[11px] font-sans text-gray-600 dark:text-gray-300 leading-relaxed tracking-wide whitespace-pre-wrap">
                  {result.stylingTip}
                </p>
              </div>

              {/* Live Color Palette Blocks */}
              <div>
                <h5 className="font-sans text-[10px] uppercase text-gray-400 tracking-widest font-bold mb-2.5 flex items-center space-x-1">
                  <Palette size={10} className="text-[#D4AF37]" />
                  <span>Ideal Color Palette</span>
                </h5>
                <div className="grid grid-cols-3 gap-2">
                  {result.idealColorPalette && result.idealColorPalette.map((color, idx) => (
                    <div key={idx} className="bg-white dark:bg-neutral-950 p-2 rounded border border-gray-100 dark:border-neutral-800 flex flex-col items-center text-center">
                      <div
                        className="w-8 h-8 rounded-full border border-black/10 shadow-sm mb-1.5"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      ></div>
                      <span className="text-[9px] font-sans font-semibold text-gray-800 dark:text-gray-200 truncate w-full">
                        {color.name}
                      </span>
                      <span className="text-[8px] font-mono text-gray-400">
                        {color.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outfit Formula */}
              <div className="bg-white dark:bg-black p-4 rounded border border-yellow-500/10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#D4AF37]/5 rounded-bl-full flex items-center justify-center">
                  <Sparkles size={8} className="text-[#D4AF37]" />
                </div>
                <h5 className="font-sans text-[10px] uppercase text-[#D4AF37] tracking-widest font-bold mb-1">
                  Suggested Outfit Blueprint
                </h5>
                <p className="text-[11px] font-sans italic text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                  "{result.outfitFormula}"
                </p>
              </div>

              {/* Vibe confidence booster */}
              <div className="border-t border-gray-100 dark:border-neutral-900 pt-3 text-center">
                <p className="text-[10px] font-mono italic text-gray-400">
                  "{result.vibeCheck}"
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
