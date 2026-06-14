import { Brand } from "./Brand.model";
import { Category } from "./Category.model";

export interface Product {
  id: string;
  name: string;
  slug: string;

  description: string;
  summary: string;
  price: number;
  imageUrls : string[];
  ratingsAverage: number;
  ratingsQuantity: number;

  brand: Brand;
  category: Category;
}