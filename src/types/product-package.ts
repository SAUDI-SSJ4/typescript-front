import type { DigitalProduct } from "./digital-product";
import type { Course } from "./course";

export interface ProductPackage {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  products: Array<{
    id: number;
    title: string;
    type: 'digital-product' | 'course';
    price: number;
  }>;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}