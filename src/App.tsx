import { useState, useEffect } from "react";
import {
  Sparkles,
  UserCheck,
  Briefcase,
  Layers,
  Shirt,
  Camera,
  Check,
  Globe,
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  Star,
  ShieldCheck,
  TrendingUp,
  Award,
  Clock,
  Send,
  X,
  AlarmClock,
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LookbookGallery from "./components/LookbookGallery";
import ProductDetailsModal from "./components/ProductDetailsModal";
import AIAdvisorModal from "./components/AIAdvisorModal";
import { PRODUCTS, SERVICES, TESTIMONIALS, BLOG_POSTS, BRAND_STORY, CONTACT_INFO, HIGHLIGHT_METRICS } from "./data";
import { Product, CartItem } from "./types";

export default function App() {
  // Application states
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [aiStylistOpen, setAiStylistOpen] = useState<boolean>(false);
  const [newsletterPopup, setNewsletterPopup] = useState<boolean>(false);
  const [emailSubscribed, setEmailSubscribed] = useState<string>("");

  // Category list filter
  const categories = ["All", "Men", "Women", "Casual", "Formal", "Streetwear", "Seasonal"];

  // Open the Newsletter popup after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setNewsletterPopup(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Sync dark class on the document structure
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Scroll handler for clean scrolling animations
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90; // offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      // Clear whole cart command if product ID is invalid
      if (product.id === "clear") return [];
      
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIdx > -1) {
        const copy = [...prevCart];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [...prevCart, { product, size, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prevCart) => {
      if (index === -1) return []; // clear whole cart
      return prevCart.filter((_, idx) => idx !== index);
    });
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  // Dynamically filter matching products based on category AND search input
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="stylep-root-wrapper" className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? "bg-neutral-950 text-gray-100" : "bg-neutral-50 text-gray-900"}`}>
      
      {/* 2. Top-tier Navigation Bar */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
        onScrollToSection={scrollToSection}
        onOpenAiStylist={() => setAiStylistOpen(true)}
        onSearch={(q) => setSearchQuery(q)}
      />

      {/* 1. Immersive Hero Banner Section */}
      <Hero
        onScrollToSection={scrollToSection}
        onOpenAiStylist={() => setAiStylistOpen(true)}
      />

      {/* 3. About StyleP Section */}
      <section id="about" className="py-24 border-b border-gray-100 dark:border-neutral-900 bg-white dark:bg-black transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual Block left */}
            <div className="relative group overflow-hidden rounded shadow-xl aspect-square lg:aspect-[4/5] bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80"
                alt="StyleP Sartorial Tailoring Atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 opacity-90"
              />
              {/* Luxury Frame overlays */}
              <div className="absolute inset-0 border-12 border-black/30 group-hover:border-[#D4AF37]/30 transition-all duration-300"></div>
              
              <div className="absolute bottom-6 left-6 bg-black/85 backdrop-blur-sm p-4 rounded border border-yellow-500/15 max-w-sm">
                <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">Designer Craftsmanship</span>
                <p className="text-[11px] text-gray-300 font-sans leading-relaxed mt-1">
                  "Symmetry, durability, and natural materials represents our three structural design goals."
                </p>
              </div>
            </div>

            {/* Narrative Block right */}
            <div className="space-y-6">
              <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold block">
                Who We Are
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-gray-900 dark:text-white leading-tight">
                Our Story & <br />Hereditary Standards
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37]"></div>
              
              <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-350 leading-relaxed font-light mt-4">
                {BRAND_STORY.narrative}
              </p>

              {/* Mission & Vision Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100 dark:border-neutral-900">
                <div className="p-4 bg-gray-50 dark:bg-neutral-900/60 rounded border border-gray-100 dark:border-neutral-900">
                  <h4 className="font-display text-xs font-bold uppercase text-[#D4AF37] tracking-widest flex items-center space-x-1.5">
                    <TrendingUp size={12} />
                    <span>Our Mission</span>
                  </h4>
                  <p className="font-sans text-[11px] text-gray-550 dark:text-gray-400 leading-relaxed mt-2 italic">
                    "{BRAND_STORY.mission}"
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-neutral-900/60 rounded border border-gray-100 dark:border-neutral-900">
                  <h4 className="font-display text-xs font-bold uppercase text-[#D4AF37] tracking-widest flex items-center space-x-1.5">
                    <Award size={12} />
                    <span>Our Vision</span>
                  </h4>
                  <p className="font-sans text-[11px] text-gray-550 dark:text-gray-400 leading-relaxed mt-2 italic">
                    "{BRAND_STORY.vision}"
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Featured Collections Showcase Section */}
      <section id="collections" className="py-24 bg-neutral-50 dark:bg-[#080808] border-b border-gray-100 dark:border-neutral-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header container */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold block">
                Boutique Showroom
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-gray-900 dark:text-white mt-2">
                Featured Collections
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37] mt-3"></div>
            </div>

            {/* Custom Horizontal Category Tag Selectors */}
            <div className="flex flex-wrap items-center mt-6 md:mt-0 gap-1.5">
              {categories.map((cat) => (
                <button
                  id={`tag-cat-${cat}`}
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded text-[10px] tracking-widest font-sans uppercase font-semibold transition-all border ${
                    activeCategory === cat
                      ? "border-[#D4AF37] bg-black dark:bg-[#D4AF37] text-[#D4AF37] dark:text-black font-extrabold"
                      : "border-gray-200 dark:border-neutral-800 text-gray-500 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filtering Warning info */}
          {searchQuery && (
            <div id="search-active-status" className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/20 text-[#D4AF37] rounded text-xs flex items-center justify-between">
              <span>Currently showing items matching: <strong>"{searchQuery}"</strong></span>
              <button onClick={() => setSearchQuery("")} className="underline hover:no-underline font-bold">Reset Search</button>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.some((item) => item.id === product.id);
              return (
                <div
                  id={`product-card-${product.id}`}
                  key={product.id}
                  className="group bg-white dark:bg-neutral-950 rounded overflow-hidden border border-gray-150 dark:border-neutral-900 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-350"
                >
                  {/* Photo with hover actions */}
                  <div className="aspect-[4/4] relative overflow-hidden bg-neutral-100 border-b border-gray-150 dark:border-neutral-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-500 bg-neutral-900"
                    />

                    {/* Quick Labels */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-1">
                      {product.isBestSeller && (
                        <span className="bg-black text-[#D4AF37] border border-yellow-500/20 px-2.5 py-0.5 text-[8px] font-sans font-bold uppercase tracking-wider">
                          Best Seller
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="bg-[#D4AF37] text-black px-2.5 py-0.5 text-[8px] font-sans font-bold uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </div>

                    {/* Favorite and Lightbox layout hover buttons */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        id={`wishlist-btn-product-${product.id}`}
                        onClick={() => handleToggleWishlist(product)}
                        className={`p-2 rounded-full border shadow-sm backdrop-blur-md transition-colors ${
                          isWishlisted
                            ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                            : "bg-white/80 hover:bg-white text-gray-600 dark:bg-neutral-900/80 dark:hover:bg-neutral-900 dark:text-gray-300 border-gray-200 dark:border-neutral-700"
                        }`}
                        title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                      >
                        <Heart size={14} className={isWishlisted ? "fill-current" : ""} />
                      </button>
                    </div>

                    {/* Quick view overlay slide banner */}
                    <div className="absolute bottom-0 left-0 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button
                        id={`quickview-btn-hover-${product.id}`}
                        onClick={() => setQuickViewProduct(product)}
                        className="w-full bg-black/90 dark:bg-white/90 text-white dark:text-black py-3 text-[10px] tracking-widest font-sans uppercase font-bold hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-black transition-colors"
                      >
                        Quick-View Details
                      </button>
                    </div>

                  </div>

                  {/* Body Copy Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">
                          {product.category} Line
                        </span>
                        <div className="flex items-center space-x-1 text-yellow-500 text-[10px]">
                          <Star size={10} className="fill-[#D4AF37] text-[#D4AF37]" />
                          <span className="font-mono text-gray-500 font-semibold">{product.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white mt-1.5 line-clamp-1 group-hover:text-[#D4AF37] transition-colors uppercase tracking-wide">
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 font-sans line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 dark:border-neutral-900">
                      <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        ${product.price} USD
                      </span>
                      <button
                        id={`quick-add-to-bag-${product.id}`}
                        onClick={() => setQuickViewProduct(product)}
                        className="text-[10px] text-gray-800 dark:text-gray-300 font-bold uppercase tracking-widest hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors"
                      >
                        Select Fit & Buy
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Empty products fallover */}
          {filteredProducts.length === 0 && (
            <div id="no-products-view" className="text-center p-20 border border-dashed border-gray-200 dark:border-neutral-800 rounded">
              <p className="text-gray-400 font-display tracking-widest text-sm mb-4">No designer garments match your filters</p>
              <button
                id="reset-filter-actions-btn"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black uppercase text-xs tracking-widest font-bold hover:bg-[#D4AF37] hover:text-black rounded transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 5. Services Section */}
      <section id="services" className="py-24 bg-white dark:bg-black border-b border-gray-100 dark:border-neutral-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header container */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
              Haute Couture Services
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-gray-900 dark:text-white mt-3">
              Professional Tailoring & Design
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
            <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              Beyond ready-to-wear garments, StyleP offers a dedicated design ecosystem from custom measurements to corporate identities and smart styling consulancies.
            </p>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((serv) => {
              // Custom icon selection to keep visuals matching
              let IconComponent = Sparkles;
              if (serv.icon === "UserCheck") IconComponent = UserCheck;
              if (serv.icon === "Briefcase") IconComponent = Briefcase;
              if (serv.icon === "Layers") IconComponent = Layers;
              if (serv.icon === "Shirt") IconComponent = Shirt;
              if (serv.icon === "Camera") IconComponent = Camera;

              return (
                <div
                  id={`service-card-${serv.id}`}
                  key={serv.id}
                  className="group p-8 rounded bg-gray-50 dark:bg-neutral-950 border border-gray-150 dark:border-neutral-900 hover:border-yellow-500/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Floating Icon accent */}
                    <div className="h-12 w-12 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/10 flex items-center justify-center rounded mb-6 group-hover:bg-[#D4AF37] transition-all duration-300">
                      <IconComponent className="text-[#D4AF37] group-hover:text-black transition-colors" size={20} />
                    </div>

                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-gray-900 dark:text-white">
                      {serv.title}
                    </h3>
                    
                    <p className="font-sans text-xs text-gray-600 dark:text-gray-350 leading-relaxed mt-3">
                      {serv.description}
                    </p>

                    <p className="font-sans text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed mt-3.5 pt-3.5 border-t border-gray-100 dark:border-neutral-900">
                      {serv.longDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-2">
                    {serv.id === "serv-2" ? (
                      // Launch AI advisor link inside specific service
                      <button
                        id="consultation-service-trigger-btn"
                        onClick={() => setAiStylistOpen(true)}
                        className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-bold inline-flex items-center space-x-1 hover:translate-x-1.5 transition-transform"
                      >
                        <span>Consult AI Assistant</span>
                        <ArrowRight size={11} />
                      </button>
                    ) : (
                      <button
                        id={`enquiry-service-${serv.id}`}
                        onClick={() => {
                          alert(`Thank you for your interest in our ${serv.title} services. Please use our concierge form or dial our client relations crew directly, and we will build a private session portfolio.`);
                          scrollToSection("contact");
                        }}
                        className="text-[10px] text-gray-800 dark:text-gray-400 hover:text-[#D4AF37] dark:hover:text-white tracking-widest uppercase font-bold inline-flex items-center space-x-1 hover:translate-x-1.5 transition-transform"
                      >
                        <span>Send Booking Inquiry</span>
                        <ArrowRight size={11} />
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Why Choose StyleP Feature Section */}
      <section id="why-choose" className="py-24 bg-neutral-50 dark:bg-[#0c0c0c] border-b border-gray-100 dark:border-neutral-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold">
              Unrivaled Quality
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-gray-900 dark:text-white mt-3">
              Why Choose StyleP
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-neutral-950 p-8 rounded border border-gray-100 dark:border-neutral-900 text-center">
              <div className="mx-auto w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center rounded-full mb-4">
                <Check className="text-[#D4AF37]" size={18} />
              </div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Premium Quality Fabrics
              </h4>
              <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                We source only certified mulberry silk, high-GSM virgin wool, and Grade-A Mongolian cashmere with soft sandwashed linings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-neutral-950 p-8 rounded border border-gray-100 dark:border-neutral-900 text-center">
              <div className="mx-auto w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center rounded-full mb-4">
                <UserCheck className="text-[#D4AF37]" size={18} />
              </div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Expert Designers
              </h4>
              <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                Our pattern-makers and designers are certified in Paris and Milan, dedicating custom attention to hand-drafted contours.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-neutral-950 p-8 rounded border border-gray-100 dark:border-neutral-900 text-center">
              <div className="mx-auto w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center rounded-full mb-4">
                <Globe className="text-[#D4AF37]" size={18} />
              </div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Sustainable Practices
              </h4>
              <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                From ethical sheep cooperatives down to raw linen weaving mills, we enforce fair-labor certifications and low water waste.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-neutral-950 p-8 rounded border border-gray-100 dark:border-neutral-900 text-center">
              <div className="mx-auto w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center rounded-full mb-4">
                <TrendingUp className="text-[#D4AF37]" size={18} />
              </div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Trend-Driven Designs
              </h4>
              <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                We synthesize classic structural silhouettes with modern asymmetrical hems and modular utility for current trend leadership.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-neutral-950 p-8 rounded border border-gray-100 dark:border-neutral-900 text-center">
              <div className="mx-auto w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center rounded-full mb-4">
                <Globe className="text-[#D4AF37]" size={18} />
              </div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Worldwide Courier Shipping
              </h4>
              <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                Enjoy complimentary premium shipping, custom brand boxes, tracking alerts, and courier drop-offs worldwide.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-neutral-950 p-8 rounded border border-gray-100 dark:border-neutral-900 text-center">
              <div className="mx-auto w-10 h-10 bg-[#D4AF37]/10 flex items-center justify-center rounded-full mb-4">
                <ShieldCheck className="text-[#D4AF37]" size={18} />
              </div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                Exceptional Customer Support
              </h4>
              <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                Our operations department provides direct hotline services, bespoke appointments, and custom tailoring guarantees.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Fine Art Lookbook Section */}
      <LookbookGallery />

      {/* 8. Fashion Expertise Section */}
      <section id="expertise" className="py-24 bg-[#0a0a0a] text-white border-b border-yellow-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Copy progress indicators */}
            <div className="space-y-6">
              <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold block">
                Production Mastery
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
                Our Fashion Expertise
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37]"></div>
              
              <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                We measure our work in absolute quality margins. From conceptual CAD sketches, certified yarn spinning, and meticulous needlecrafting, we keep close eyes on execution percentages.
              </p>

              {/* Progress meters */}
              <div className="space-y-4 pt-4">
                
                {/* 1 */}
                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1.5">
                    <span>Design Innovation</span>
                    <span className="text-[#D4AF37] font-bold">98%</span>
                  </div>
                  <div className="h-1.5 bg-neutral-900 w-full overflow-hidden">
                    <div id="prog-i" className="h-full bg-[#D4AF37] transition-all" style={{ width: "98%" }}></div>
                  </div>
                </div>

                {/* 2 */}
                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1.5">
                    <span>Premium Fabric Selection</span>
                    <span className="text-[#D4AF37] font-bold">100% Raw Certified</span>
                  </div>
                  <div className="h-1.5 bg-neutral-900 w-full overflow-hidden">
                    <div id="prog-f" className="h-full bg-[#D4AF37] transition-all" style={{ width: "100%" }}></div>
                  </div>
                </div>

                {/* 3 */}
                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1.5">
                    <span>Tailoring Excellence</span>
                    <span className="text-[#D4AF37] font-bold">95% (Double stitched)</span>
                  </div>
                  <div className="h-1.5 bg-neutral-900 w-full overflow-hidden">
                    <div id="prog-t" className="h-full bg-[#D4AF37] transition-all" style={{ width: "95%" }}></div>
                  </div>
                </div>

                {/* 4 */}
                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-gray-400 mb-1.5">
                    <span>Sustainable Fashion index</span>
                    <span className="text-[#D4AF37] font-bold">90% water saving mills</span>
                  </div>
                  <div className="h-1.5 bg-neutral-900 w-full overflow-hidden">
                    <div id="prog-s" className="h-full bg-[#D4AF37] transition-all" style={{ width: "90%" }}></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Visual right side showing large high-fashion metrics */}
            <div className="relative p-8 bg-neutral-900 rounded border border-yellow-500/10 flex flex-col justify-between aspect-square lg:aspect-[1.1] text-center sm:text-left">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-bl-full"></div>
              
              <span className="text-[10px] font-mono uppercase text-[#D4AF37] tracking-[0.25em] font-semibold block mb-2">
                Certified Performance Metrics
              </span>

              {/* Bento styled statistics */}
              <div className="grid grid-cols-2 gap-6 my-auto pt-4">
                
                <div className="p-4 bg-black/60 rounded border border-neutral-800">
                  <span className="block font-display text-2xl sm:text-3xl font-extrabold text-white text-[#D4AF37]">
                    {HIGHLIGHT_METRICS.happyCustomers}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block mt-1">
                    Happy Customers
                  </span>
                </div>

                <div className="p-4 bg-black/60 rounded border border-neutral-800">
                  <span className="block font-display text-2xl sm:text-3xl font-extrabold text-white text-[#D4AF37]">
                    {HIGHLIGHT_METRICS.fashionProjects}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block mt-1">
                    Fashion projects
                  </span>
                </div>

                <div className="p-4 bg-black/60 rounded border border-neutral-800">
                  <span className="block font-display text-2xl sm:text-3xl font-extrabold text-white text-[#D4AF37]">
                    {HIGHLIGHT_METRICS.fashionExperts}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block mt-1">
                    In-house experts
                  </span>
                </div>

                <div className="p-4 bg-black/60 rounded border border-neutral-800">
                  <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#D4AF37]">
                    {HIGHLIGHT_METRICS.expertDesigners}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block mt-1">
                    Couturiers
                  </span>
                </div>

              </div>

              <div className="mt-4 pt-4 border-t border-neutral-850 flex items-center justify-between text-[11px] font-sans text-gray-450">
                <span>Bureau Veritas Fair Trade Certified</span>
                <span className="text-[#D4AF37] font-semibold">HQ: Paris, France</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 9. Consumer Testimonials */}
      <section id="testimonials" className="py-24 bg-white dark:bg-black border-b border-gray-100 dark:border-neutral-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold block">
              Customer Experiences
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-gray-900 dark:text-white mt-3">
              Testimonials
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                id={`testimonial-card-${test.id}`}
                key={test.id}
                className="bg-neutral-50 dark:bg-neutral-950 p-8 rounded border border-gray-150 dark:border-neutral-900 relative flex flex-col justify-between"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center space-x-1 text-yellow-500 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={i < test.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300"}
                      />
                    ))}
                  </div>

                  <p className="font-sans text-xs italic text-gray-650 dark:text-gray-300 leading-relaxed">
                    "{test.review}"
                  </p>
                </div>

                {/* Consumer Meta */}
                <div className="flex items-center space-x-3.5 mt-8 pt-6 border-t border-gray-100 dark:border-neutral-900">
                  <img
                    src={test.image}
                    alt={test.name}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover border border-[#D4AF37]/30"
                  />
                  <div>
                    <h4 className="font-display font-medium text-xs text-gray-900 dark:text-white uppercase tracking-wider">
                      {test.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-sans font-medium">
                      {test.role}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Fashion Blog Section */}
      <section id="blog" className="py-24 bg-neutral-50 dark:bg-[#060606] border-b border-gray-100 dark:border-neutral-900 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold block">
              Editorial Stories
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-gray-900 dark:text-white mt-3">
              The StyleP Gazette
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div
                id={`blog-card-${post.id}`}
                key={post.id}
                className="group bg-white dark:bg-neutral-950 rounded overflow-hidden border border-gray-150 dark:border-neutral-900 flex flex-col justify-between"
              >
                {/* Photo */}
                <div className="aspect-[16/10] overflow-hidden relative bg-neutral-200">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-sm px-2.5 py-1 text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase rounded">
                    {post.category}
                  </div>
                </div>

                {/* Text body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-gray-400 block mb-1">
                      {post.date} • {post.readTime}
                    </span>
                    <h3 className="font-display font-bold text-sm tracking-wide uppercase text-gray-900 dark:text-white leading-snug line-clamp-2 mt-1.5 group-hover:text-[#D4AF37] transition-all">
                      {post.title}
                    </h3>
                    <p className="text-[11px] font-sans text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed mt-2.5">
                      {post.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-900">
                    <button
                      id={`read-blog-${post.id}`}
                      onClick={() => {
                        alert(`"${post.title}"\nWritten under creative seal on ${post.date}.\nThis feature-depth piece is currently exclusive to our VIP subscribers list in physical magazine editions.`);
                      }}
                      className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase inline-flex items-center space-x-1 hover:translate-x-1.5 transition-transform"
                    >
                      <span>Read Feature Article</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. Call-to-Action Section */}
      <section id="cta" className="relative py-24 bg-neutral-900 text-white overflow-hidden text-center border-b border-yellow-500/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1400&q=80"
            alt="StyleP atelier collection background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-25 filter blur-xs"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">
            Elevate Your Signature Vibe
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            Transform Your Wardrobe <br />With StyleP
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-200 leading-relaxed font-light max-w-xl mx-auto">
            Step into garments that represent confidence, fluid lines, and pristine luxury fabrics. Our customer advisors are ready to schedule private showroom appointments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 max-w-sm mx-auto w-full">
            <button
              id="cta-shop-collection-btn"
              onClick={() => scrollToSection("collections")}
              className="w-full sm:w-auto bg-[#D4AF37] hover:bg-yellow-600 text-black px-8 py-3.5 text-xs font-bold font-sans uppercase tracking-widest rounded transition-all duration-300"
            >
              Shop Now
            </button>
            <button
              id="cta-contact-us-btn"
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 px-8 py-3.5 text-xs font-semibold font-sans uppercase tracking-widest rounded transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* 12. Contact Section with Embedded Interactive Map placeholder */}
      <section id="contact" className="py-24 bg-white dark:bg-black text-gray-900 dark:text-white transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase font-bold block">
              Concierge Desk
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-gray-900 dark:text-white mt-3">
              Sovereign Communication
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="p-6 md:p-8 bg-neutral-50 dark:bg-neutral-950 rounded border border-gray-150 dark:border-neutral-900">
              <h3 className="font-display text-lg font-bold tracking-wide uppercase text-gray-900 dark:text-white mb-6">
                Send Concierge Request
              </h3>
              
              <form
                id="contact-form-block"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Chéri! Your request has been transmitted safely to our central concierge. A styling coordinator will contact you shortly.");
                  e.currentTarget.reset();
                }}
                className="space-y-4 text-xs font-sans"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="user-name" className="block text-[9px] uppercase font-bold text-gray-400 mb-1.5">Name</label>
                    <input
                      id="user-name"
                      type="text"
                      required
                      placeholder="e.g., Jean Mercer"
                      className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 focus:outline-none focus:border-[#D4AF37] text-gray-800 dark:text-gray-100 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="user-email" className="block text-[9px] uppercase font-bold text-gray-400 mb-1.5">Email Address</label>
                    <input
                      id="user-email"
                      type="email"
                      required
                      placeholder="e.g., jean@luxury.com"
                      className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 focus:outline-none focus:border-[#D4AF37] text-gray-800 dark:text-gray-100 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="user-phone" className="block text-[9px] uppercase font-bold text-gray-400 mb-1.5">Phone Number (Optional)</label>
                  <input
                    id="user-phone"
                    type="tel"
                    placeholder="e.g., +33 1 47 20 02 11"
                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 focus:outline-none focus:border-[#D4AF37] text-gray-800 dark:text-gray-100 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="user-message" className="block text-[9px] uppercase font-bold text-gray-400 mb-1.5">Private Message / Styling Inquiry</label>
                  <textarea
                    id="user-message"
                    rows={4}
                    required
                    placeholder="Enter details of your size preferences, target event, or design adjustments you require..."
                    className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded px-3 py-2 focus:outline-none focus:border-[#D4AF37] text-gray-800 dark:text-gray-100 placeholder-gray-400"
                  />
                </div>

                <button
                  id="submit-contact-btn"
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-black rounded transition-all"
                >
                  Transmit Message
                </button>
              </form>
            </div>

            {/* Information Desk & Embedded visual Map */}
            <div className="space-y-8 flex flex-col justify-between">
              
              <div className="space-y-4 text-xs font-sans">
                <h3 className="font-display text-lg font-bold tracking-wide uppercase text-gray-900 dark:text-white">
                  Headquarter Location
                </h3>
                <div className="w-8 h-0.5 bg-[#D4AF37]"></div>

                <div className="space-y-3.5 text-gray-650 dark:text-gray-400">
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="text-[#D4AF37] mt-0.5 flex-shrink-0" size={14} />
                    <span>{CONTACT_INFO.address}</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <Phone className="text-[#D4AF37] mt-0.5 flex-shrink-0" size={14} />
                    <span>{CONTACT_INFO.phone}</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <Mail className="text-[#D4AF37] mt-0.5 flex-shrink-0" size={14} />
                    <span>{CONTACT_INFO.email}</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <Clock className="text-[#D4AF37] mt-0.5 flex-shrink-0" size={14} />
                    <span>{CONTACT_INFO.hours}</span>
                  </div>
                </div>

                {/* Social media connections */}
                <div className="pt-2.5">
                  <span className="block text-[9px] uppercase font-bold text-gray-400 mb-2">Concierge Media Streams</span>
                  <div className="flex items-center space-x-2.5">
                    <a href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer" title="Instagram Link" className="p-2 border border-gray-200 dark:border-neutral-800 rounded text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                      <Instagram size={14} />
                    </a>
                    <a href={CONTACT_INFO.facebook} target="_blank" rel="noreferrer" title="Facebook Link" className="p-2 border border-gray-200 dark:border-neutral-800 rounded text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                      <Facebook size={14} />
                    </a>
                    <a href={CONTACT_INFO.youtube} target="_blank" rel="noreferrer" title="YouTube Link" className="p-2 border border-gray-200 dark:border-neutral-800 rounded text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                      <Youtube size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* High precision aesthetic map illustration */}
              <div className="bg-neutral-50 dark:bg-neutral-950 p-4 rounded border border-gray-150 dark:border-neutral-900 flex-1 min-h-[160px] flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-gray-400 border-b border-gray-100 dark:border-neutral-900 pb-2">
                  <span>Interactive Map Grounding</span>
                  <span className="text-[#D4AF37]">Active Location</span>
                </div>
                
                {/* Visual architectural map outline placeholder */}
                <div className="my-auto py-2 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-xs text-[#D4AF37] animate-ping">
                    <span>●</span>
                  </div>
                  <h4 className="font-display font-medium text-[11px] uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Avenue Montaigne, Paris Atelier
                  </h4>
                  <p className="text-[10px] text-gray-400 font-sans max-w-xs">
                    "Conveniently situated opposite the Grand Théâtre des Champs-Élysées. Valet parking on-site."
                  </p>
                </div>

                <div className="pt-2 text-center text-gray-550 dark:text-gray-500 text-[8px] font-mono uppercase border-t border-gray-100 dark:border-neutral-900">
                  Latitude: 48.8661° N | Longitude: 2.3045° E
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 13. High-Contrast Luxury Footer */}
      <footer className="bg-black text-gray-400 text-xs border-t border-yellow-500/10 transition-all font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* 1. Brand overview */}
            <div className="lg:col-span-2 space-y-4">
              <span className="font-display tracking-[0.25em] text-2xl font-bold text-white uppercase select-none">
                STYLE<span className="text-[#D4AF37] font-sans font-light">P</span>
              </span>
              <p className="text-[11px] font-sans leading-relaxed text-gray-400 max-w-sm">
                StyleP is a sanctuary of high-end clothing. Every pattern is crafted in our Parisian atelier, sourced ethically, and tailored to give you timeless confidence across global spotlights.
              </p>
              
              {/* Trust certification */}
              <div className="p-3 bg-neutral-900 rounded border border-yellow-500/10 flex items-center space-x-2 w-max">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                <span className="text-[9px] font-mono uppercase text-gray-300">100% Certified Ethical Luxury</span>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div>
              <h4 className="font-display text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
                Atelier Directory
              </h4>
              <ul className="space-y-2 text-[11px]">
                {["Home", "About", "Services", "Portfolio", "Lookbook"].map((item) => (
                  <li key={item}>
                    <button
                      id={`footer-link-atelier-${item.toLowerCase()}`}
                      onClick={() => scrollToSection(item === "Portfolio" ? "lookbook" : item.toLowerCase())}
                      className="hover:text-[#D4AF37] transition-all"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Collections */}
            <div>
              <h4 className="font-display text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
                Collections Catalog
              </h4>
              <ul className="space-y-2 text-[11px]">
                {["Men", "Women", "Casual", "Formal", "Streetwear"].map((item) => (
                  <li key={item}>
                    <button
                      id={`footer-link-cat-${item.toLowerCase()}`}
                      onClick={() => {
                        setActiveCategory(item);
                        scrollToSection("collections");
                      }}
                      className="hover:text-[#D4AF37] transition-all"
                    >
                      {item} Collection
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Support Desk & Newsletter */}
            <div className="space-y-4">
              <h3 className="font-display text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Concierge Dispatch
              </h3>
              
              <p className="text-[10px] text-gray-400 leading-relaxed leading-normal">
                Sign up to retrieve periodic private lookbook announcements and exclusive member-only campaigns.
              </p>

              <form
                id="footer-newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`S’il vous plaît! E-mail ${emailSubscribed} is successfully logged to member registry.`);
                  setEmailSubscribed("");
                }}
                className="flex items-center"
              >
                <input
                  id="footer-email-input"
                  type="email"
                  required
                  placeholder="e.g. m@luxury.com"
                  value={emailSubscribed}
                  onChange={(e) => setEmailSubscribed(e.target.value)}
                  className="bg-neutral-900 border border-neutral-850 px-3 py-2 text-[11px] text-gray-100 rounded-l focus:outline-none focus:border-[#D4AF37] w-full placeholder-gray-500"
                />
                <button
                  id="footer-newsletter-btn"
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-yellow-600 text-black px-3.5 py-2 rounded-r text-[11px] font-bold transition-all"
                  aria-label="Submit email"
                >
                  <Send size={11} />
                </button>
              </form>
            </div>

          </div>

          {/* Copyright notice & Policies */}
          <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-500 space-y-4 md:space-y-0">
            <span>
              &copy; {new Date().getFullYear()} StyleP Haute Couture. Handcrafted with high standards of precision styling.
            </span>
            <div className="flex space-x-4">
              <button onClick={() => alert("This premium sandbox demo website features mock billing systems and fully private data storage.")} className="hover:text-[#D4AF37] transition-all">Privacy Policy</button>
              <button onClick={() => alert("All designs shown are intellectual property of StyleP fashion house.")} className="hover:text-[#D4AF37] transition-all">Terms & Conditions</button>
              <button onClick={() => alert("All materials are Fair Trade certified organic origins.")} className="hover:text-[#D4AF37] transition-all">Sustainability Audit</button>
            </div>
          </div>

        </div>
      </footer>

      {/* Modern Feature: Dynamic Product Quick-View modal */}
      {quickViewProduct && (
        <ProductDetailsModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.some((item) => item.id === quickViewProduct.id)}
        />
      )}

      {/* Modern Feature: AI Consultant Dialog */}
      {aiStylistOpen && (
        <AIAdvisorModal
          onClose={() => setAiStylistOpen(false)}
          products={PRODUCTS}
          onOpenQuickView={(p) => {
            setQuickViewProduct(p);
            setAiStylistOpen(false);
          }}
        />
      )}

      {/* Modern Feature: Newsletter Popup */}
      {newsletterPopup && (
        <div id="newsletter-popup-block" className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white dark:bg-neutral-950 p-6 rounded-lg shadow-2xl border border-yellow-500/20 text-gray-900 dark:text-white transition-all transform animate-slide-in flex flex-col relative">
          
          <button
            id="close-newsletter-popup"
            onClick={() => setNewsletterPopup(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-black dark:hover:text-white"
            aria-label="Dismiss newsletter popup"
          >
            <X size={15} />
          </button>

          <span className="text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold block mb-1">
            Privilege Club Invite
          </span>

          <h3 className="font-display font-bold text-sm tracking-wide uppercase">
            Unlock 10% First Order Benefit
          </h3>
          
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
            Register your Email and connect with the StyleP inner circle to enjoy complimentary shipping and private catalog launches.
          </p>

          <form
            id="popup-newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert(`Welcome! Your newsletter discount code has been generated: 'STYLEP10'`);
              setNewsletterPopup(false);
            }}
            className="mt-4 flex items-center bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded overflow-hidden"
          >
            <input
              id="popup-email-input"
              type="email"
              required
              placeholder="e.g. darling@chic.com"
              className="bg-transparent px-3 py-2 text-[10px] font-sans text-gray-800 dark:text-gray-100 placeholder-gray-450 focus:outline-none w-full"
            />
            <button
              id="submit-popup-newsletter"
              type="submit"
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-[#D4AF37] px-4 py-2.5 text-[10px] font-bold font-sans uppercase tracking-widest transition-all"
            >
              Joined
            </button>
          </form>

          <p className="text-[8px] text-center text-gray-400 mt-2 font-mono">
            Unsubscribe anytime. Zero spam guarantee.
          </p>

        </div>
      )}

    </div>
  );
}
