import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';

import { Product } from './product.model';
import { addProduct, loadProducts } from '../cart/cart.action';
import { CartReducer } from '../cart/cart.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public baseURL = 'https://5ee744ce52bb0500161fd6e4.mockapi.io/products';

  operation$: Observable<string>;

  constructor(private http: HttpClient, private store: Store<CartReducer>) {
    this.operation$ = this.store.pipe(
      select(state => state.cartReducer.operId),
    );
  }

  loadProducts(): Observable<any> {
    return this.http.get<Product[]>(this.baseURL);
  }

  /* Run on app.component */
  loadFromLocalStorage(): void {
    const recoveredProducts = JSON.parse(
      localStorage.getItem('@KuantoKusta_Items'),
    );

    if (recoveredProducts) {
      this.store.dispatch(loadProducts({ recoveredProducts }));
    }
  }

  addToCart(product: Product): boolean {
    const operId = 'add';
    let result: boolean;

    this.store.dispatch(addProduct({ product, operId }));

    this.operation$.pipe(take(1)).subscribe(data => {
      result = data === operId;
    });

    return result;
  }
}
