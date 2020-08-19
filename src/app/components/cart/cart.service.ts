import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { CartReducer } from './cart.reducer';
import { Product } from '../product/product.model';
import {
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProduct,
} from './cart.action';
import { AlertEventService } from '../alert/alert.event.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  operation$: Observable<string>;

  constructor(
    private store: Store<CartReducer>,
    private alertEventService: AlertEventService,
  ) {
    this.operation$ = this.store.pipe(
      select(state => state.cartReducer.operId),
    );
  }

  getProductsInCart(): Observable<Product[]> {
    return this.store.pipe(select(state => state.cartReducer.cart.products));
  }

  removeProduct(id: string): boolean {
    const operId = 'remove';
    let result: boolean;

    this.store.dispatch(removeProduct({ id, operId }));

    this.operation$.pipe(take(1)).subscribe(data => {
      result = data === operId;
    });

    return result;
  }

  increase(id: string): void {
    this.store.dispatch(increaseProductQuantity({ id }));
  }

  decrease(id: string): void {
    this.store.dispatch(decreaseProductQuantity({ id }));
  }

  showAlert(): Observable<boolean> {
    return this.alertEventService.response$.pipe(take(1));
  }
}
