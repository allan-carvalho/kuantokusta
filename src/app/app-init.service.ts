import { Injectable } from '@angular/core';

import { ProductService } from './components/product/product.service';

@Injectable()
export class AppInitService {
  constructor(private productService: ProductService) {}

  Init(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      this.productService.loadFromLocalStorage();
      resolve();
    });
  }
}
