export interface DigitalProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  downloadFile: string;
  category: string;
  status: 'published' | 'draft';
  author: string;
  createdAt: string;
  updatedAt: string;
  downloads: number;
  rating: number;
  reviews: number;
}

export interface IDigitalProductForm {
  title: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  downloadFile: string;
  category: string;
  status: 'published' | 'draft';
}