import { BasketItem } from "./BasketItem.model";

export interface Basket {
  email : string;
  items: BasketItem[];
  totalPrice: number;
}