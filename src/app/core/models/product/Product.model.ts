import { Brand } from "./Brand.model";
import { Category } from "./Category.model";

export interface Product {
  id: number;
  name: string;
  description: string;
  summary: string;
  price: number;
  imageFile: string;

  brand: Brand;
  type: Category;
}