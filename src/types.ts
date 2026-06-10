export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Men" | "Women" | "Casual" | "Formal" | "Streetwear" | "Seasonal";
  image: string;
  description: string;
  sizes: string[];
  rating: number;
  reviewsCount: number;
  bullets: string[];
  fabric: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDesc: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  review: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  readTime: string;
}

export interface StylingResult {
  greeting: string;
  stylingTip: string;
  idealColorPalette: { name: string; hex: string }[];
  outfitFormula: string;
  vibeCheck: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}
