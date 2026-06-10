import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

interface HeroProps {
  onScrollToSection: (id: string) => void;
  onOpenAiStylist: () => void;
}

export default function Hero({ onScrollToSection, onOpenAiStylist }: HeroProps) {
  // Beautiful generated background image link
  const heroImg = "/src/assets/images/stylep_hero_banner_1781080735420.png";

  return (
    <section id="hero" className="relative h-[calc(100vh-120px)] min-h-[500px] flex items-center justify-center overflow-hidden bg-neutral-900 border-b border-yellow-500/10">
      
      {/* Editorial High-Quality Background Image with Subtle Parallax Zoom effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="StyleP Editorial Luxury Collection"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-102 hover:scale-105 transition-transform duration-10000 opacity-65 select-none"
        />
        {/* Soft elegant vignette and luxury color overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
      </div>

      {/* Floating elegant accent particles / lights */}
      <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-[#D4AF37]/5 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[30%] right-[15%] w-48 h-48 rounded-full bg-[#D4AF37]/5 blur-3xl animate-pulse duration-5000"></div>

      {/* Foreground Hero Content Card with generous typography */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 select-none text-center flex flex-col items-center">
        
        {/* Couture brand level indicator */}
        <div className="inline-flex items-center space-x-2 border border-[#D4AF37]/30 bg-black/45 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></span>
          <span className="font-sans text-[9px] tracking-[0.3em] font-medium text-[#D4AF37] uppercase">StyleP Haute Couture • Vol. III</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight uppercase">
          Elevate Your Style <br className="hidden sm:inline" />
          <span className="text-[#D4AF37] font-display italic font-medium lowercase">with</span> Style<span className="text-[#D4AF37]">P</span>
        </h1>

        {/* Subheadline description */}
        <p className="mt-6 text-sm sm:text-md md:text-lg text-gray-200 font-sans max-w-2xl leading-relaxed font-light tracking-wide">
          Discover premium fashion crafted for confidence, comfort, and timeless elegance. 
          Indulge in tailored fits, certified organic fibers, and masterclass silhouettes designed just for you.
        </p>

        {/* CTA Button Layout - Shop Collection & Explore Lookbook */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-5 w-full max-w-md">
          <button
            id="hero-shop-collection-btn"
            onClick={() => onScrollToSection("collections")}
            className="w-full sm:w-auto bg-[#D4AF37] hover:bg-yellow-600 text-black px-8 py-4 text-xs font-bold font-sans uppercase tracking-[0.2em] rounded shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Shop Collection</span>
            <ArrowRight size={13} />
          </button>

          <button
            id="hero-explore-lookbook-btn"
            onClick={() => onScrollToSection("lookbook")}
            className="w-full sm:w-auto bg-black/60 backdrop-blur-md hover:bg-white/10 text-white border border-white/20 px-8 py-4 text-xs font-semibold font-sans uppercase tracking-[0.2em] rounded transition-all duration-300 transform active:scale-95"
          >
            Explore Lookbook
          </button>
        </div>

        {/* AI stylist callout inside hero */}
        <button
          id="hero-stylist-trigger"
          onClick={onOpenAiStylist}
          className="mt-8 text-xs font-sans text-gray-300 hover:text-[#D4AF37] transition-all flex items-center space-x-1.5 tracking-wider uppercase border-b border-white/10 pb-1 hover:border-[#D4AF37]/50"
        >
          <Sparkles size={11} className="text-[#D4AF37] animate-bounce" />
          <span>Need consultation? Query our AI Stylist</span>
        </button>

      </div>

      {/* Interactive Scroll Down Indicator */}
      <button
        id="hero-scroll-indicator"
        onClick={() => onScrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-gray-400 hover:text-white transition-colors animate-bounce flex flex-col items-center"
        aria-label="Scroll down to About Section"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase font-sans mb-1 font-medium text-[#D4AF37]/80">Scroll to Explore</span>
        <ChevronDown size={16} className="text-[#D4AF37]" />
      </button>

    </section>
  );
}
