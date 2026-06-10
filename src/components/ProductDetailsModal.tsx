import { useState } from "react";
import { X, Heart, ShoppingBag, Star, ShieldCheck, RefreshCcw, Truck } from "lucide-react";
import { Product } from "../types";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBag = () => {
    onAddToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div id="quickview-modal-overlay" className="fixed inset-0 z-55 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal Card */}
      <div className="bg-white dark:bg-neutral-950 max-w-4xl w-full rounded-lg overflow-hidden shadow-2xl relative border border-gray-100 dark:border-neutral-900 flex flex-col md:flex-row text-gray-900 dark:text-white max-h-[90vh] md:max-h-[85vh]">
        
        {/* Close button */}
        <button
          id="close-quickview-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/45 hover:bg-black/75 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-white rounded-full p-2 transition-colors duration-200"
          aria-label="Close details"
        >
          <X size={16} />
        </button>

        {/* Left: Beautiful zoomable zoom card photo */}
        <div className="w-full md:w-1/2 relative bg-gray-50 dark:bg-neutral-900 min-h-[250px] md:min-h-0 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-h-[45vh] md:max-h-full"
          />
          
          {/* Luxury overlays */}
          {product.isBestSeller && (
            <span className="absolute top-4 left-4 bg-black border border-yellow-500/30 text-[#D4AF37] px-3 py-1 font-sans text-[9px] tracking-widest uppercase font-semibold">
              Best Seller
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="absolute top-4 left-4 bg-yellow-550 text-white px-3 py-1 font-sans text-[9px] tracking-widest uppercase font-semibold">
              New Arrival
            </span>
          )}
        </div>

        {/* Right: Premium Information Panel */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          
          {/* Category indicator & stars */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#D4AF37]">
              {product.category} Collection
            </span>
            <div className="flex items-center space-x-1">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < Math.floor(product.rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300 dark:text-neutral-700"}
                  />
                ))}
              </div>
              <span className="font-sans text-[10px] text-gray-400 font-medium tracking-wider">
                ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Title & Pricing */}
          <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-2 leading-snug">
            {product.name}
          </h2>

          <p className="font-sans text-lg font-semibold text-[#D4AF37] mt-2 mb-4">
            ${product.price} USD
          </p>

          <p className="text-xs text-gray-650 dark:text-gray-300 leading-relaxed tracking-wide font-sans mb-4">
            {product.description}
          </p>

          {/* Material compositions */}
          <div className="border-t border-b border-gray-100 dark:border-neutral-900 py-3 mb-4 text-[10px] font-mono flex justify-between">
            <span className="text-gray-400 uppercase tracking-widest">Premium Fabric</span>
            <span className="text-gray-900 dark:text-white font-medium">{product.fabric}</span>
          </div>

          {/* Key bullets / details */}
          {product.bullets && product.bullets.length > 0 && (
            <div className="mb-6">
              <h4 className="font-sans text-[10px] uppercase text-gray-400 tracking-widest font-bold mb-2">
                Garment Features
              </h4>
              <ul className="text-[11px] font-sans text-gray-600 dark:text-gray-350 space-y-1">
                {product.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Size Picker selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-sans text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                Select Silhouette Fit / Size
              </h4>
              <span className="text-[10px] text-[#D4AF37] hover:underline font-semibold cursor-pointer">
                What's My Fit?
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  id={`size-btn-${size}`}
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3.5 py-1.5 rounded text-[10px] font-mono tracking-wider transition-all border ${
                    selectedSize === size
                      ? "border-[#D4AF37] bg-[#D4AF37] text-black font-extrabold"
                      : "border-gray-200 dark:border-neutral-800 bg-transparent text-gray-700 dark:text-gray-300 hover:border-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Action Bar buttons */}
          <div className="mt-auto pt-4 flex flex-col sm:flex-row items-stretch gap-3 border-t border-gray-100 dark:border-neutral-900">
            {/* Add to Bag */}
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAddToBag}
              className={`flex-1 py-3.5 text-xs font-bold font-sans tracking-widest uppercase rounded flex items-center justify-center space-x-2 transition-all ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-black dark:bg-white text-white dark:text-black hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-black"
              }`}
            >
              <ShoppingBag size={13} />
              <span>{isAdded ? "Added to Bag!" : "Add To Bag"}</span>
            </button>

            {/* Wishlist button */}
            <button
              id="modal-wishlist-btn"
              onClick={() => onToggleWishlist(product)}
              className={`px-4 py-3.5 border rounded flex items-center justify-center transition-all ${
                isWishlisted
                  ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5"
                  : "border-gray-200 dark:border-neutral-800 text-gray-500 hover:text-black dark:hover:text-white hover:border-gray-400"
              }`}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart size={14} className={isWishlisted ? "fill-[#D4AF37]" : ""} />
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-[9px] font-sans tracking-wider uppercase text-gray-405 dark:text-gray-400 text-center">
            <div className="flex flex-col items-center">
              <Truck size={12} className="text-[#D4AF37] mb-1" />
              <span>Free Courier</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCcw size={12} className="text-[#D4AF37] mb-1" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={12} className="text-[#D4AF37] mb-1" />
              <span>100% Certified</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
