import { useState } from "react";
import { X, ZoomIn, ArrowRight, Camera, Sparkles } from "lucide-react";

interface LookbookItem {
  id: string;
  title: string;
  campaign: string;
  category: "Editorial" | "Casual" | "Luxury" | "Street Fashion" | "Corporate";
  image: string;
  photographer: string;
  seasonCount: string;
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "look-1",
    title: "Sovereign Gold & Sandwashed Linen",
    campaign: "Autumn Capsule Vol I",
    category: "Editorial",
    image: "/src/assets/images/stylep_womens_collection_1781080755204.png", // our beautiful custom gold linen picture!
    photographer: "Alessio Bever",
    seasonCount: "FW 2026 Collection Launch"
  },
  {
    id: "look-2",
    title: "The Architecture of Executive Wool",
    campaign: "Modern Executive Power",
    category: "Corporate",
    image: "/src/assets/images/stylep_mens_collection_1781080769254.png", // our charcoal coat gentleman!
    photographer: "Heidi Linne",
    seasonCount: "Corporate Masterpiece"
  },
  {
    id: "look-3",
    title: "Elysian Fluid Pleated Satin drapes",
    campaign: "Gala Prestige Collection",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    photographer: "Marc-Antoine",
    seasonCount: "High-spot Cocktail Wardrobe"
  },
  {
    id: "look-4",
    title: "Urban Utility Street Armor",
    campaign: "Metropolitan Avenue Layering",
    category: "Street Fashion",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    photographer: "Sasha Gorsh",
    seasonCount: "New Age Streetwear"
  },
  {
    id: "look-5",
    title: "Serene Pastels in Sicilian Sunlight",
    campaign: "Mediterranean Resort Wear",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    photographer: "Stefano Gabb",
    seasonCount: "Summer High-Class"
  },
  {
    id: "look-6",
    title: "The Golden Hour Sovereign Trench",
    campaign: "Grand Boulevards Campaign",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    photographer: "Julien Mercer",
    seasonCount: "Autumn Editorial"
  },
  {
    id: "look-7",
    title: "Bespoke Navy Tuxedo lines",
    campaign: "Sovereign High Dining",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    photographer: "Luca Brandolini",
    seasonCount: "Executive Red Carpet"
  },
  {
    id: "look-8",
    title: "Cashmere Knits & Parisian Coffee",
    campaign: "Pre-winter Casual Layers",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=800&q=80",
    photographer: "Dimitri Ros",
    seasonCount: "Cozy Elite Wear"
  }
];

export default function LookbookGallery() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterTabs = ["All", "Editorial", "Casual", "Luxury", "Street Fashion", "Corporate"];

  const filteredItems = activeTab === "All"
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter(item => item.category === activeTab);

  const selectedItem = lightboxIndex !== null ? LOOKBOOK_ITEMS[lightboxIndex] : null;

  return (
    <section id="lookbook" className="py-24 bg-white dark:bg-black text-gray-950 dark:text-gray-105 border-b border-gray-100 dark:border-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header container */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
            Fine Art Lookbook
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-gray-900 dark:text-white mt-3">
            Sovereign Visual Campaigns
          </h2>
          <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
          <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
            Each photographic editorial showcases StyleP garments styled for live events, magazines, and exclusive high-fashion announcements. Click any shot to zoom into details.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              id={`tab-filter-${tab}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-sans font-semibold tracking-widest uppercase transition-all border ${
                activeTab === tab
                  ? "border-[#D4AF37] bg-black dark:bg-[#D4AF37] text-[#D4AF37] dark:text-black font-bold"
                  : "border-gray-200 dark:border-neutral-800 text-gray-500 hover:border-gray-400 dark:hover:border-neutral-600 hover:text-black dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Layout with clean aspect-ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const index = LOOKBOOK_ITEMS.findIndex(l => l.id === item.id);
            return (
              <div
                id={`lookbook-card-${item.id}`}
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative overflow-hidden rounded bg-gray-50 dark:bg-neutral-900 cursor-pointer border border-gray-100 dark:border-neutral-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Photo */}
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle dark zoom overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-[#D4AF37] text-black h-10 w-10 rounded-full flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn size={16} />
                    </div>
                  </div>
                </div>

                {/* Banner Campaign Metadata */}
                <div className="p-4 bg-white dark:bg-neutral-950">
                  <span className="text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                    {item.category} • {item.seasonCount}
                  </span>
                  <h4 className="font-display font-bold text-xs tracking-wide text-gray-900 dark:text-white uppercase mt-1 truncate">
                    {item.title}
                  </h4>
                  <p className="font-sans text-[10px] text-gray-400 mt-1 flex items-center justify-between">
                    <span>Campaign: {item.campaign}</span>
                    <span className="text-[#D4AF37] text-[9px] font-semibold italic flex items-center">
                      <Camera size={9} className="mr-0.5" /> {item.photographer}
                    </span>
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty status */}
        {filteredItems.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No lookbook items available in this category currently.
          </div>
        )}

      </div>

      {/* Lightbox Modal slider overlay */}
      {lightboxIndex !== null && selectedItem && (
        <div id="lightbox-overlay" className="fixed inset-0 z-55 bg-black/95 flex flex-col justify-between p-4 sm:p-6 md:p-8">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <span className="font-display tracking-widest text-sm text-[#D4AF37] font-semibold flex items-center space-x-2">
              <Sparkles size={14} className="animate-spin duration-5000" />
              <span>StyleP Editorial Concierge</span>
            </span>
            <button
              id="close-lightbox-btn"
              onClick={() => setLightboxIndex(null)}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Active Campaign visual display */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-4 gap-6 max-h-[70vh] my-auto">
            {/* Left Image */}
            <div className="w-full max-w-sm md:max-w-md h-full max-h-[50vh] md:max-h-full flex items-center justify-center relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain rounded border border-white/10 bg-neutral-900"
              />
            </div>

            {/* Right Information */}
            <div className="max-w-md text-white space-y-4 md:text-left text-center">
              <span className="inline-block bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] tracking-[0.25em] uppercase px-3 py-1 font-semibold rounded">
                Category: {selectedItem.category}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase text-white tracking-wide">
                {selectedItem.title}
              </h3>
              <p className="text-xs font-sans text-gray-300 leading-relaxed max-w-sm">
                This image represents StyleP's signature campaign "{selectedItem.campaign}". It demonstrates natural drapery lines, high-tension stitching craftsmanship, and premium organic certified threads.
              </p>
              
              <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="block text-[8px] font-mono uppercase text-gray-500">Photographer</span>
                  <span className="text-[11px] font-sans text-gray-300 font-semibold">{selectedItem.photographer}</span>
                </div>
                <div>
                  <span className="block text-[8px] font-mono uppercase text-gray-500">Season Edition</span>
                  <span className="text-[11px] font-sans text-gray-300 font-semibold">{selectedItem.seasonCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom navigation selectors */}
          <div className="flex items-center justify-between max-w-md mx-auto w-full pt-4 border-t border-white/10">
            <button
              id="lightbox-prev-btn"
              onClick={() => {
                const prev = (lightboxIndex - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length;
                setLightboxIndex(prev);
              }}
              className="text-white hover:text-[#D4AF37] px-4 py-2 text-xs font-mono uppercase font-semibold tracking-wider flex items-center space-x-1"
            >
              <span>← Prev</span>
            </button>

            <span className="text-gray-400 text-xs font-mono">
              {lightboxIndex + 1} / {LOOKBOOK_ITEMS.length}
            </span>

            <button
              id="lightbox-next-btn"
              onClick={() => {
                const next = (lightboxIndex + 1) % LOOKBOOK_ITEMS.length;
                setLightboxIndex(next);
              }}
              className="text-white hover:text-[#D4AF37] px-4 py-2 text-xs font-mono uppercase font-semibold tracking-wider flex items-center space-x-1"
            >
              <span>Next →</span>
            </button>
          </div>

        </div>
      )}

    </section>
  );
}
