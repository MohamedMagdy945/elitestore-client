import { BasketItem } from "./BasketItem.model";

export interface Basket {
  userName: string;
  items: BasketItem[];
}