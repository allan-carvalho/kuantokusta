import { Action, createReducer, on } from '@ngrx/store';

import {
  addProduct,
  removeProduct,
  loadProducts,
  decreaseProductQuantity as actionDecrease,
  increaseProductQuantity as actionIncrease,
} from './cart.action';
import { Product } from '../product/product.model';
import { initialState, CartState } from './cart.state';

export interface CartReducer {
  cartReducer: CartState;
}

const changeQuantity = (product: Product, action: string): Product => {
  if (action === 'increase') {
    const increasedProduct = { ...product, quantity: product.quantity + 1 };
    return increasedProduct;
  }

  const decreasedProduct = { ...product, quantity: product.quantity - 1 };
  return decreasedProduct;
};

const reducer = createReducer(
  initialState,
  on(loadProducts, (state, { recoveredProducts }) => {
    const tmpState: CartState = JSON.parse(JSON.stringify(state));
    tmpState.cart.products = [...recoveredProducts];
    tmpState.cart.totalProducts = recoveredProducts.length;

    return {
      ...tmpState,
    };
  }),
  on(addProduct, (state, { product, operId }) => {
    const tmpState: CartState = JSON.parse(JSON.stringify(state));
    const tmpProducts = [...tmpState.cart.products];

    const productIndex = tmpProducts.findIndex(p => p.id === product.id);

    if (productIndex >= 0) {
      const increasedProduct = changeQuantity(
        tmpProducts[productIndex],
        'increase',
      );

      tmpProducts[productIndex] = increasedProduct;

      localStorage.setItem('@KuantoKusta_Items', JSON.stringify(tmpProducts));

      return { ...state, cart: { ...state.cart } };
    }

    const newProduct = { ...product, quantity: 1 };

    tmpProducts.push(newProduct);

    localStorage.setItem('@KuantoKusta_Items', JSON.stringify(tmpProducts));

    tmpState.cart.products = [...tmpProducts];
    tmpState.cart.totalProducts += 1;
    tmpState.operId = operId;

    return { ...tmpState };
  }),
  on(removeProduct, (state, { id, operId }) => {
    const tmpState: CartState = JSON.parse(JSON.stringify(state));
    const tmpProducts = [...tmpState.cart.products];

    const productIndex = tmpProducts.findIndex(p => p.id === id);

    if (productIndex >= 0) {
      tmpProducts.splice(productIndex, 1);

      localStorage.setItem('@KuantoKusta_Items', JSON.stringify(tmpProducts));

      tmpState.cart.products = [...tmpProducts];
      tmpState.cart.totalProducts -= 1;
      tmpState.operId = operId;

      return { ...tmpState };
    }

    return { ...state };
  }),
  on(actionIncrease, (state, { id }) => {
    const tmpState: CartState = JSON.parse(JSON.stringify(state));
    const tmpProducts = [...tmpState.cart.products];

    const productIndex = tmpProducts.findIndex(p => p.id === id);

    const increasedProduct = changeQuantity(
      tmpProducts[productIndex],
      'increase',
    );

    tmpProducts[productIndex] = increasedProduct;

    localStorage.setItem('@KuantoKusta_Items', JSON.stringify(tmpProducts));

    tmpState.cart.products = [...tmpProducts];

    return { ...tmpState };
  }),
  on(actionDecrease, (state, { id }) => {
    const tmpState: CartState = JSON.parse(JSON.stringify(state));
    const tmpProducts = [...tmpState.cart.products];

    const productIndex = tmpProducts.findIndex(p => p.id === id);

    const decreasedProduct = changeQuantity(
      tmpProducts[productIndex],
      'decrease',
    );

    tmpProducts[productIndex] = decreasedProduct;

    localStorage.setItem('@KuantoKusta_Items', JSON.stringify(tmpProducts));

    tmpState.cart.products = [...tmpProducts];

    return { ...tmpState };
  }),
);

export function cartReducer(state: CartState | undefined, action: Action): any {
  return reducer(state, action);
}
