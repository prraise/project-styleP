import { useState, ChangeEvent } from "react";
import { Search, ShoppingBag, Heart, Sun, Moon, Menu, X, Trash2, ChevronRight, Sparkles } from "lucide-react";
import { CartItem, Product } from "../types";

interface NavbarProps {
  cart: CartItem[];
  wishlist: Product[];
  onRemoveFromCart: (index: number) => void;
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenQuickView: (product: Product) => void;
  onScrollToSection: (id: string) => void;
  onOpenAiStylist: () => void;
  onSearch: (query: string) => void;
}

export default function Navbar({
  cart,
  wishlist,
  onRemoveFromCart,
  onRemoveFromWishlist,
  onAddToCart,
  darkMode,
  setDarkMode,
  onOpenQuickView,
  onScrollToSection,
  onOpenAiStylist,
  onSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Collections", id: "collections" },
    { name: "Services", id: "services" },
    { name: "Lookbook", id: "lookbook" },
    { name: "Expertise", id: "expertise" },
    { name: "Reviews", id: "testimonials" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Premium top notification / campaign bar */}
      <div id="announcement-bar" className="bg-black border-b border-yellow-500/20 text-[#D4AF37] py-2 text-center text-[10px] tracking-[0.2em] font-medium uppercase font-sans">
        Complimentary Premium Worldwide Shipping on Orders Over $250 • Private Viewings Available
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 dark:bg-black/75 border-b border-gray-100 dark:border-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Left Brand Identity */}
            <div className="flex-shrink-0 flex items-center">
              <button
                id="brand-logo-btn"
                onClick={() => onScrollToSection("hero")}
                className="font-display tracking-[0.3em] text-2xl font-bold text-gray-900 dark:text-white select-none hover:opacity-90 transition-opacity"
              >
                STYLE<span className="text-[#D4AF37] font-sans font-light">P</span>
              </button>
            </div>

            {/* Desktop Navigation Link Hierarchy */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <button
                  id={`nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => onScrollToSection(link.id)}
                  className="font-sans text-xs tracking-widest uppercase transition-all hover:text-[#D4AF37] text-gray-600 dark:text-gray-300 hover:underline hover:underline-offset-8"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Right Action Widgets */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              
              {/* Intelligent AI Stylist Button */}
              <button
                id="nav-ai-stylist-btn"
                onClick={onOpenAiStylist}
                className="hidden lg:flex items-center space-x-2 border border-[#D4AF37] bg-[#D4AF37]/5 px-3 py-1.5 rounded-full text-xs text-[#D4AF37] font-semibold tracking-wider uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-350 shadow-sm shadow-[#D4AF37]/10"
              >
                <Sparkles size={13} className="animate-pulse" />
                <span>AI Stylist</span>
              </button>

              {/* Dynamic Theme Toggler */}
              <button
                id="theme-toggle-btn"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 text-gray-600 dark:text-gray-300 transition-colors"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Inline Search Bar Trigger */}
              <div className="relative">
                <button
                  id="search-toggle-btn"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors ${searchOpen ? "text-[#D4AF37]" : "text-gray-600 dark:text-gray-300"}`}
                  title="Search items"
                >
                  <Search size={18} />
                </button>
              </div>

              {/* Wishlist Icon with Badges */}
              <button
                id="wishlist-drawer-btn"
                onClick={() => {
                  setWishlistOpen(true);
                  setCartOpen(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 text-gray-600 dark:text-gray-300 relative transition-all"
                title="Your Wishlist"
              >
                <Heart size={18} className={wishlist.length > 0 ? "fill-[#D4AF37] text-[#D4AF37]" : ""} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-[#D4AF37] text-black font-sans text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Icon with Active Totals */}
              <button
                id="cart-drawer-btn"
                onClick={() => {
                  setCartOpen(true);
                  setWishlistOpen(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 text-gray-600 dark:text-gray-300 relative transition-all"
                title="Your Cart"
              >
                <ShoppingBag size={18} className={totalCartItems > 0 ? "text-[#D4AF37]" : ""} />
                {totalCartItems > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-black dark:bg-white text-white dark:text-black font-sans text-[9px] font-bold rounded-full flex items-center justify-center border border-yellow-500">
                    {totalCartItems}
                  </span>
                )}
              </button>

            </div>
          </div>
        </div>

        {/* Dynamic Nav Search overlay */}
        {searchOpen && (
          <div className="bg-gray-50 dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-900 py-3 block transition-all">
            <div className="max-w-3xl mx-auto px-4 flex items-center space-x-3">
              <Search className="text-[#D4AF37]" size={18} />
              <input
                id="nav-search-input"
                type="text"
                placeholder="Search premium collections (e.g., Blazer, Trench, Silk, Suit...)"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-100 py-1 border-b border-gray-300 dark:border-neutral-700 focus:border-[#D4AF37] placeholder-gray-400 dark:placeholder-gray-600"
                autoFocus
              />
              <button
                id="clear-search-btn"
                onClick={() => {
                  setSearchQuery("");
                  onSearch("");
                  setSearchOpen(false);
                }}
                className="text-xs text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Drawer: Shopping Cart */}
      {cartOpen && (
        <div id="cart-drawer-backdrop" className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-neutral-950 h-full flex flex-col shadow-2xl relative border-l border-gray-200 dark:border-neutral-900 text-gray-900 dark:text-white">
            <div className="p-6 border-b border-gray-100 dark:border-neutral-900 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={20} className="text-[#D4AF37]" />
                <span className="font-display text-lg tracking-wider font-semibold">Luxury Cart</span>
                <span className="text-xs text-gray-400">({totalCartItems})</span>
              </div>
              <button id="close-cart-btn" onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-black dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Cart content list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                  <ShoppingBag size={40} className="text-gray-300 dark:text-gray-700" />
                  <p className="font-display text-sm tracking-widest text-gray-400">Your shopping bag is empty</p>
                  <button
                    id="cart-start-shopping-btn"
                    onClick={() => {
                      setCartOpen(false);
                      onScrollToSection("collections");
                    }}
                    className="mt-2 text-xs uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37] pb-1 hover:text-yellow-600"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.size}-${idx}`} className="flex items-start space-x-4 pb-4 border-b border-gray-50 dark:border-neutral-900">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded bg-neutral-100 border border-gray-200 dark:border-neutral-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans text-xs font-semibold tracking-wider text-gray-900 dark:text-gray-100 truncate">
                        {item.product.name}
                      </h4>
                      <p className="font-mono text-[11px] text-gray-400 mt-0.5">
                        Size: <span className="text-[#D4AF37] font-semibold">{item.size}</span> | Qty: {item.quantity}
                      </p>
                      <p className="font-sans text-xs font-medium text-gray-800 dark:text-gray-200 mt-1">
                        ${item.product.price} USD
                      </p>
                    </div>
                    <button
                      id={`remove-cart-item-${idx}`}
                      onClick={() => onRemoveFromCart(idx)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Remove Item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Check-out Summary Panel */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-neutral-900 bg-gray-50 dark:bg-neutral-900/40">
                <div className="flex justify-between text-xs tracking-widest uppercase mb-2">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold">${cartTotal} USD</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 mb-6">
                  <span>Courier Delivery (Worldwide)</span>
                  <span className="text-[#D4AF37] uppercase font-bold tracking-widest">Free</span>
                </div>
                <button
                  id="checkout-btn"
                  onClick={() => {
                    alert(`Merci! You have successfully purchased StyleP couture totaling $${cartTotal} USD.\nBespoke packaging and tracking numbers will be delivered to your e-mail address shortly.`);
                    onRemoveFromCart(-1); // can clear whole cart as success
                    setCartOpen(false);
                  }}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 text-xs tracking-widest uppercase font-bold hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  Pay & Secure Delivery
                </button>
                <p className="text-[9px] text-center text-gray-400 mt-3 font-sans">
                  Sovereign transaction secured under TLS 1.3 encryption.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Slide-out Drawer: Wishlist */}
      {wishlistOpen && (
        <div id="wishlist-drawer-backdrop" className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-neutral-950 h-full flex flex-col shadow-2xl relative border-l border-gray-200 dark:border-neutral-900 text-gray-900 dark:text-white">
            <div className="p-6 border-b border-gray-100 dark:border-neutral-900 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart size={20} className="text-[#D4AF37] fill-[#D4AF37]" />
                <span className="font-display text-lg tracking-wider font-semibold">Your Wishlist</span>
                <span className="text-xs text-gray-400">({wishlist.length})</span>
              </div>
              <button id="close-wishlist-btn" onClick={() => setWishlistOpen(false)} className="text-gray-500 hover:text-black dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Wishlist list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                  <Heart size={40} className="text-gray-300 dark:text-gray-700" />
                  <p className="font-display text-sm tracking-widest text-gray-400">Save wishlist of favorite apparel</p>
                  <button
                    id="wishlist-start-shopping-btn"
                    onClick={() => {
                      setWishlistOpen(false);
                      onScrollToSection("collections");
                    }}
                    className="mt-2 text-xs uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37] pb-1 hover:text-yellow-600"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div key={product.id} className="flex items-start space-x-4 pb-4 border-b border-gray-50 dark:border-neutral-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded bg-neutral-100 border border-gray-200 dark:border-neutral-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans text-xs font-semibold tracking-wider text-gray-900 dark:text-gray-100 truncate">
                        {product.name}
                      </h4>
                      <p className="font-sans text-xs font-medium text-gray-800 dark:text-gray-200 mt-1">
                        ${product.price} USD
                      </p>
                      <button
                        id={`wishlist-quickview-${product.id}`}
                        onClick={() => {
                          onOpenQuickView(product);
                          setWishlistOpen(false);
                        }}
                        className="text-[10px] text-[#D4AF37] tracking-wider uppercase font-bold mt-2 inline-flex items-center hover:translate-x-1 transition-transform"
                      >
                        Quick Add <ChevronRight size={10} />
                      </button>
                    </div>
                    <button
                      id={`remove-wishlist-item-${product.id}`}
                      onClick={() => onRemoveFromWishlist(product)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Hamburger menu overlay */}
      {mobileMenuOpen && (
        <div id="mobile-menu-backdrop" className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed top-0 left-0 w-3/4 max-w-xs bg-white dark:bg-black h-full shadow-xl p-6 flex flex-col space-y-6 text-gray-900 dark:text-white border-r border-gray-100 dark:border-neutral-900 overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-neutral-900">
              <span className="font-display tracking-widest text-[#D4AF37] font-bold">STYLEP NAV</span>
              <button id="close-mobile-menu-btn" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-black dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            {/* Nav links */}
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  id={`mobile-nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => {
                    onScrollToSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-sans text-xs font-semibold tracking-widest uppercase py-1.5 text-gray-700 dark:text-gray-200 hover:text-[#D4AF37]"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-neutral-900">
              {/* Mobile AI consultant launch */}
              <button
                id="mobile-ai-stylist-btn"
                onClick={() => {
                  onOpenAiStylist();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37] rounded font-semibold text-xs uppercase tracking-widest flex items-center justify-center space-x-2"
              >
                <Sparkles size={14} className="animate-pulse" />
                <span>AI Stylist Guidance</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
