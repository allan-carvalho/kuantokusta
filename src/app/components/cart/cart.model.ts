import { Product } from '../product/product.model';

export interface CartModel {
  products: Product[];
  totalProducts: number;
}
