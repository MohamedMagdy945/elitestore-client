import { Brand } from "./Brand.model";
import { Category } from "./Category.model";

export interface Product {
  id: string;
  name: string;
  title: string;
  slug: string;

  description: string;
  summary: string;
  price: number;
  imageUrl: string;
  ratingsAverage: number;
  ratingsQuantity: number;

  brand: Brand;
  type: Category;
}