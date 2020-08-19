import { TestBed, getTestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';

import { CartService } from '../components/cart/cart.service';
import { Product } from '../components/product/product.model';
import { CartReducer } from '../components/cart/cart.reducer';

describe('CartService', () => {
  let injector: TestBed;
  let service: CartService;
  let store: MockStore<CartReducer>;
  let mockRemoveResponse: MemoizedSelector<CartReducer, string>;

  const dummyProducts: Product[] = [
    {
      id: '123',
      name: 'Product 1',
      price: '11.99',
      photo: 'photo1.png',
    },
    {
      id: '1234',
      name: 'Product 2',
      price: '12.99',
      photo: 'photo2.png',
    },
    {
      id: '12345',
      name: 'Product 3',
      price: '13.99',
      photo: 'photo2.png',
    },
  ];

  const initialState: CartReducer = {
    cartReducer: {
      cart: {
        products: dummyProducts,
        totalProducts: 3,
      },
      operId: 'remove',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        provideMockStore({
          initialState,
        }),
      ],
    });

    injector = getTestBed();
    store = injector.get(MockStore);
    service = injector.get(CartService);
  });

  it('should load products from store', done => {
    service.getProductsInCart().subscribe(data => {
      expect(data.length).toBe(3);
      done();
    });
  });

  it('should remove product from cart', () => {
    const response = service.removeProduct('123');
    expect(response).toBeTruthy();
  });
});
