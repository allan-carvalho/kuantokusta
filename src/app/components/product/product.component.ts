import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { take } from 'rxjs/operators';

import { Product } from './product.model';
import { ProductService } from './product.service';
import { ToastService } from '../toast/toast.service';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @ViewChild('toastContainer', { read: ViewContainerRef }) toastContainer;

  products: Product[];

  pagedProducts: Product[];

  page = 1;

  firstPage: boolean;

  lastPage: boolean;

  loading = true;

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.productService
      .loadProducts()
      .pipe(take(1))
      .subscribe(data => {
        this.products = data;
        this.productsPagination(1);
      });
  }

  productsPagination(page: number): void {
    this.loading = true;

    const localProducts = [...this.products];
    const itemsPerPage = 12;
    const pages = Math.ceil(this.products.length / itemsPerPage);
    const firstProductOfPage = itemsPerPage * (page - 1);

    this.page = page;
    this.pagedProducts = localProducts.splice(firstProductOfPage, itemsPerPage);
    this.firstPage = page === 1;
    this.lastPage = page === pages;

    this.loading = false;
  }

  addToCart(product: Product): void {
    const result = this.productService.addToCart(product);

    if (result) {
      this.toastService.addToast(
        {
          toastType: 'success',
          toastIcon: 'success',
          toastMsg: 'Product added to Cart',
        },
        this.toastContainer,
      );
    }
  }
}
