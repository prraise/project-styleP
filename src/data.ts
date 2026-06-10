import { Product, Service, Testimonial, BlogPost } from "./types";

// Note: Using the beautiful custom generated assets we created for the key showcases!
export const PRODUCTS: Product[] = [
  {
    id: "prod-w-1",
    name: "Celine Gold-Accented Linen Blazer",
    price: 389,
    category: "Women",
    image: "/src/assets/images/stylep_womens_collection_1781080755204.png",
    description: "Impeccably tailored gold and organic linen blazer matching lightweight luxury fabric with structured modern contours.",
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviewsCount: 124,
    bullets: ["Premium organic linen blend", "Custom gold-dusted custom hardware", "Breathable signature lining", "Designed for powerful presence"],
    fabric: "70% Organic Linen, 30% Fine Silk",
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: "prod-m-1",
    name: "Obsidian Tailored Wool Trench Coat",
    price: 520,
    category: "Men",
    image: "/src/assets/images/stylep_mens_collection_1781080769254.png",
    description: "An iconic formal outerwear piece meticulously sculpted from fine heavy-weight charcoal wool, suited for elite weather resistance and peak luxury feel.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 5.0,
    reviewsCount: 89,
    bullets: ["800 GSM Virgin Wool", "Structured padded shoulders", "Inner satin device pockets", "Hand-grafted lapels"],
    fabric: "100% Premium Virgin Wool",
    isBestSeller: true
  },
  {
    id: "prod-w-2",
    name: "Alabaster Silk Slip Evening Dress",
    price: 340,
    category: "Women",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    description: "Elegant lightweight evening gown boasting a bias-cut fluid silhouette that pools gracefully around the ankle.",
    sizes: ["S", "M", "L"],
    rating: 4.8,
    reviewsCount: 45,
    bullets: ["Double wash standard silk", "Elegant cowl neckline", "Adjustable low-back strap detail", "Subtly sandwashed gloss feel"],
    fabric: "100% Mulberry Silk",
    isNewArrival: true
  },
  {
    id: "prod-m-2",
    name: "Avenue Cashmere Knit Turtleneck",
    price: 245,
    category: "Men",
    image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80",
    description: "Featherweight yet ultra-insulating. A core staple of the executive autumn Lookbook.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviewsCount: 52,
    bullets: ["12-gauge premium cashmere knit", "Perfect stretch shape recovery", "Anti-pilling treatment applied", "Ribbed high collar & cuffs"],
    fabric: "100% Grade-A Mongolian Cashmere",
    isNewArrival: true
  },
  {
    id: "prod-c-1",
    name: "Serene Oversized Silk Knit Lounger",
    price: 195,
    category: "Casual",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    description: "Exquisite lounge knitwear combining relaxed proportions with rich high-end fabric drape.",
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviewsCount: 204,
    bullets: ["Breathable slouch fit", "Woven style weave texture", "Minimal stitch lines"],
    fabric: "50% Silk, 50% Organic Cotton"
  },
  {
    id: "prod-c-2",
    name: "Monochrome Lounge Wool Pants",
    price: 160,
    category: "Casual",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80",
    description: "Superb drape trousers offering premium flexibility, ideal for relaxed urban work-from-anywhere styling.",
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviewsCount: 93,
    bullets: ["Flexible luxury waistband", "Deep luxury zip side pockets", "Pre-washed touch texture"],
    fabric: "90% Merino Wool, 10% Lycra"
  },
  {
    id: "prod-f-1",
    name: "Soiree Obsidian Tuxedo Blazer",
    price: 480,
    category: "Formal",
    image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=800&q=80",
    description: "Crafted for high dining encounters and gala spotlights, featuring satin silk contrast shawl lapels.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 67,
    bullets: ["Satin peak shawl collar", "Dual-vent classic structure", "Bespoke internal StyleP metal emblem label"],
    fabric: "90% Barathea Wool, 10% Satin Silk Trim",
    isBestSeller: true
  },
  {
    id: "prod-f-2",
    name: "Elysian Pleated Satin Evening Jumpsuit",
    price: 410,
    category: "Formal",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    description: "An elegant alternative to traditional gowns, sporting high-rise pleated legs that catch ambient light.",
    sizes: ["XS", "S", "M", "L"],
    rating: 4.9,
    reviewsCount: 38,
    bullets: ["Cascading pleated bodice", "Internal structural corset grip", "Invisible back-zipper closure"],
    fabric: "100% Heavies Satin Crêpe"
  },
  {
    id: "prod-s-1",
    name: "Phantom Cargo Utility Street Vest",
    price: 220,
    category: "Streetwear",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    description: "Avant-garde design meets performance utility, engineered with multiple modular modular compartments.",
    sizes: ["M", "L", "XL"],
    rating: 4.7,
    reviewsCount: 110,
    bullets: ["Waterproof premium nylon weave", "Modular clip chest straps", "Signature gold metallic accent zipper"],
    fabric: "100% Recycled Tech Nylon"
  },
  {
    id: "prod-s-2",
    name: "Symmetric Oversized Cotton Hoodie",
    price: 180,
    category: "Streetwear",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    description: "Densely knit luxury French terry cotton fleece providing an architectural comfort drape.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewsCount: 145,
    bullets: ["Heavyweight 600 GSM knit", "Drop shoulder street profile", "Seamless hood closure", "Acid washed charcoal tint"],
    fabric: "100% Extra-Long Staple Cotton"
  },
  {
    id: "prod-se-1",
    name: "Montecito Riviera Resort Shirt",
    price: 155,
    category: "Seasonal",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    description: "Breezy custom pattern shirt designed for luxury seaside escapes and tropical sunset cocktails.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviewsCount: 78,
    bullets: ["Light-as-air Cuban collar", "Handwashed mother-of-pearl buttons", "Loose breathable fit"],
    fabric: "100% Pure Italian Tencel"
  },
  {
    id: "prod-se-2",
    name: "Nordic Frost Ribbed Cashmere Beanie",
    price: 98,
    category: "Seasonal",
    image: "https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=800&q=80",
    description: "A super-soft ribbed beanie designed to withstand frozen conditions with refined winter styling.",
    sizes: ["One Size"],
    rating: 4.8,
    reviewsCount: 56,
    bullets: ["Thick 4-ply cashmere wool", "Perfect snug shape recovery", "Woven gold logo tab"],
    fabric: "100% Pure Premium Mongolian Wool Cashmere"
  }
];

export const SERVICES: Service[] = [
  {
    id: "serv-1",
    title: "Custom Fashion Design",
    description: "Personalized haute couture clothing solutions designed uniquely for your measurements and style aspiration.",
    longDesc: "Collaborate directly with our master couturiers to design and fit custom-made premium pieces. From sketching to pattern drafting and luxury fabric sourcing, we execute garments that fit your body, posture, and personality perfectly.",
    icon: "Sparkles"
  },
  {
    id: "serv-2",
    title: "Fashion Consultation",
    description: "Professional, individual styling guidance covering your best silhouettes, colors, and wardrobe architectures.",
    longDesc: "Gain access to master visual consultants who analyze your features, lifestyle, and preferences. Get a bespoke digital style directory complete with ideal color schemes, accessorizing guidelines, and outfit pairings.",
    icon: "UserCheck"
  },
  {
    id: "serv-3",
    title: "Corporate Uniform Design",
    description: "Custom bespoke uniforms that encapsulate your business identity, prestige, and workplace functionality.",
    longDesc: "Deliver an premium brand statement for your staff. We design and mass-produce modern uniform apparel that combines workplace ergonomics with luxury-grade tailor lines and sustainable, durable materials.",
    icon: "Briefcase"
  },
  {
    id: "serv-4",
    title: "Bulk Apparel Manufacturing",
    description: "High-spec, ethical apparel manufacturing using premium machinery and rigorous quality control standards.",
    longDesc: "We provide high-capacity apparel production for boutiques, designers, and high-end brands. Backed by expert pattern experts and strict sustainable labor standards, we execute bulk schedules with beautiful precision.",
    icon: "Layers"
  },
  {
    id: "serv-5",
    title: "Brand Merchandise",
    description: "Custom premium corporate or artist merchandise that elevates advocacy and visual appeal.",
    longDesc: "Replace generic promotional t-shirts with pieces people love to wear. We craft high-quality sweatshirts, organic beanies, and luxury heavyweight tees branded to your brand aesthetic.",
    icon: "Shirt"
  },
  {
    id: "serv-6",
    title: "Fashion Styling Services",
    description: "Professional styling for photoshoots, executive events, public appearances, and media wardrobes.",
    longDesc: "Whether prepping for an executive keynote, a national photo shoot, or media presentations, our styling crew oversees wardrobe choices, layout matching, and jewelry setups to ensure high-definition visual perfection.",
    icon: "Camera"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Eleanor Vance",
    role: "Creative Director, V&A",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    review: "StyleP's custom tailoring and fabric selection is nothing short of majestic. Their focus on the small gold accenting and bias silk cuts made me feel immensely confident at the Gala.",
    rating: 5
  },
  {
    id: "test-2",
    name: "Arthur Pendelton",
    role: "Principal Architect",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    review: "I commissioned five corporate blazers and three personal linen sets. The drape of the cashmere wool is light yet structured. The service and consultation were exceptionally detailed.",
    rating: 5
  },
  {
    id: "test-3",
    name: "Sophia Martinez",
    role: "Lifestyle Content Creator",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    review: "The custom design consultation felt like being in a Paris salon. Their stylist matched my skin palette with 'Saffron Gold' silk and 'Obsidian Black' details. Absolute genius!",
    rating: 5
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Architecture of a Premium Cashmere Coat",
    category: "Styling Tips",
    date: "May 28, 2026",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
    description: "Deconstructing wool counts, interior canvas structure, and inner pocket mechanics that separate standard luxury from hereditary outerwear.",
    readTime: "4 min read"
  },
  {
    id: "blog-2",
    title: "Chic Minimalist Styling for the Modern Entrepreneur",
    category: "Fashion Trends",
    date: "June 02, 2026",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=600&q=80",
    description: "How a curated 9-piece capsule rotation allows powerful, effortless presentations from boardrooms to upscale evening mixers.",
    readTime: "5 min read"
  },
  {
    id: "blog-3",
    title: "Circular Fashion: Elevating Luxury Woolen Sustainability",
    category: "Industry Insights",
    date: "June 08, 2026",
    image: "https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=600&q=80",
    description: "How StyleP works directly with family sheep cooperatives to guarantee zero-waste weaving, fair certification, and organic fabrics.",
    readTime: "6 min read"
  }
];

export const HIGHLIGHT_METRICS = {
  happyCustomers: "10,000+",
  fashionProjects: "500+",
  fashionExperts: "50+",
  expertDesigners: "12 Certified"
};

export const BRAND_STORY = {
  narrative: "Founded with the ambition to combine classic tailoring legacy with modern silhouette innovations, StyleP stands as a sanctuary of premium clothing. Every pattern is crafted by hand, every fabric sourced with absolute ecological transparency, and every design constructed to empower your unique voice.",
  mission: "To redefine modern fashion through quality craftsmanship and innovative design.",
  vision: "To become a globally recognized fashion brand inspiring confidence and individuality."
};

export const CONTACT_INFO = {
  address: "108 Avenue Montaigne, 75008 Paris, France",
  phone: "+33 1 47 20 02 11",
  email: "concierge@stylep-fashion.com",
  hours: "Monday - Saturday: 10:00 AM - 7:00 PM | Sunday: Closed",
  instagram: "https://instagram.com/stylep_fashion",
  facebook: "https://facebook.com/stylep_fashion",
  pinterest: "https://pinterest.com/stylep_fashion",
  tiktok: "https://tiktok.com/stylep_fashion",
  youtube: "https://youtube.com/stylep_fashion"
};
