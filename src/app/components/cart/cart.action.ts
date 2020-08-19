import { createAction, props } from '@ngrx/store';
import { Product } from '../product/product.model';

export enum ActionTypes {
  Load = 'LoadFromLocalStorage',
  Add = 'AddProduct',
  Remove = 'RemoveProduct',
  Increase = 'IncreaseProductQuantity',
  Decrease = 'DecreaseProductQuantity',
}

export const loadProducts = createAction(
  ActionTypes.Load,
  props<{ recoveredProducts: Product[] }>(),
);

export const addProduct = createAction(
  ActionTypes.Add,
  props<{ product: Product; operId: string }>(),
);

export const removeProduct = createAction(
  ActionTypes.Remove,
  props<{ id: string; operId: string }>(),
);

export const increaseProductQuantity = createAction(
  ActionTypes.Increase,
  props<{ id: string }>(),
);

export const decreaseProductQuantity = createAction(
  ActionTypes.Decrease,
  props<{ id: string }>(),
);
