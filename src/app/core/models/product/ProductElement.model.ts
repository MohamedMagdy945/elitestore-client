import { Product } from "./Product.model";

export interface ProductElement {
    count:   number;
    id:     string;
    product: Product;
    price:   number;
}
