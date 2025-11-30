export enum CategoryType {
  SAREE = 'Saree',
  SUIT = 'Suit',
  DRESS_MATERIAL = 'Dress Material'
}

export type PriceCategory = '₹200 - ₹500' | '₹500 - ₹1,000' | '₹1,000+';

export interface Supplier {
  id: string;
  name: string;
  location: string;
  market: string;
  specialty: string;
  isTopSupplier: boolean;
  category: CategoryType;
  imageUrl: string;
  description: string;
  rating: number;
  priceCategories: PriceCategory[]; // Changed to array to support multiple ranges
  priceRangeDisplay: string;    // Display text (e.g. "₹200 - ₹1,000")
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum AppView {
  HOME = 'HOME',
  SAREES = 'SAREES',
  SUITS = 'SUITS',
  MATERIALS = 'MATERIALS',
  CONTACT = 'CONTACT'
}