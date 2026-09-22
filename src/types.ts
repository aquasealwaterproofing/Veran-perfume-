export interface FragranceNote {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  editorialQuote: string;
  price: number;
  originalPrice?: number;
  volume: string;
  concentration: string; // 'EAU DE PARFUM' | 'PURE CONCENTRATED ATTAR' | 'DISCOVERY SET'
  category: 'perfume' | 'attar' | 'discovery';
  notes: FragranceNote;
  notesSummary: string;
  intensity: 'Medium' | 'Deep' | 'Sublime' | 'Intense';
  longevity: string;
  sillage: string;
  character: string[];
  image: string;
  secondaryImage?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  city: string;
  scent: string;
  rating: number;
  note: string; // placeholder note indicator
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
