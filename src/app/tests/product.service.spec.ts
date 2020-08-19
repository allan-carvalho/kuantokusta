import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';

import { cartReducer } from '../components/cart/cart.reducer';
import { ProductService } from '../components/product/product.service';
import { Product } from '../components/product/product.model';

describe('ProductService', () => {
  let injector: TestBed;
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({ cartReducer })],
      providers: [ProductService],
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(ProductService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should return an array of Products', done => {
    const dummyProducts = [
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

    service.loadProducts().subscribe(products => {
      expect(products.length).toBe(3);
      expect(products).toEqual(dummyProducts);
      done();
    });

    const req = httpMock.expectOne(`${service.baseURL}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should add product to cart', () => {
    const dummyProduct: Product = {
      id: '123',
      name: 'Product 1',
      photo: 'Photo 1',
      price: '12',
    };

    expect(service.addToCart(dummyProduct)).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
