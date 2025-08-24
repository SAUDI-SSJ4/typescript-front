export interface Product {
  id: number;
  name: string;
  type: 'course' | 'session' | 'digital-product' | 'workshop';
  image?: string;
  originalPrice: number;
}

export interface Offer {
  id: number;
  title: string;
  description?: string;
  product: Product;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  maxPurchases: number;
  currentPurchases: number;
  expiryDate: string;
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CreateOfferData {
  title: string;
  description?: string;
  productId: number;
  discountedPrice: number;
  maxPurchases: number;
  expiryDate: string;
}

export interface OfferStats {
  totalOffers: number;
  activeOffers: number;
  expiredOffers: number;
  totalSales: number;
}