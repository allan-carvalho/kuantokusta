import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CartReducer } from '../../cart/cart.reducer';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private store: Store<CartReducer>) {}

  getTotalProducts(): Observable<number> {
    return this.store.select(state => {
      return state.cartReducer.cart.totalProducts;
    });
  }
}
