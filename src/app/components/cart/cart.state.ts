import { CartModel } from './cart.model';

export interface CartState {
  cart: CartModel;
  operId: string;
}

export const initialState: CartState = {
  cart: {
    products: [],
    totalProducts: 0,
  },
  operId: '',
};
