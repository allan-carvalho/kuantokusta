import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { takeUntil } from 'rxjs/operators';

import { CartService } from './cart.service';
import { ToastService } from '../../components/toast/toast.service';
import { AlertService } from '../../components/alert/alert.service';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild('toastContainer', { read: ViewContainerRef }) toastContainer;

  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer;

  hasModal = false;

  totalValue = 0;

  products = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private alertService: AlertService,
    private cartService: CartService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.cartService
      .getProductsInCart()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.products = [...data];
        this.totalValue = data.reduce((final, current) => {
          final += Number(current.price) * current.quantity;
          return final;
        }, 0);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProductQuantity(id: string): number {
    const product = this.products.find(p => p.id === id);

    return product.quantity;
  }

  increase(id: string): void {
    this.cartService.increase(id);
  }

  decrease(id: string): void {
    this.cartService.decrease(id);
  }

  toggleModal(): void {
    this.hasModal = !this.hasModal;
  }

  showAlert(id: string): void {
    this.toggleModal();

    this.alertService.addAlert(
      'Are you sure you want to remove this item?',
      this.modalContainer,
    );

    this.cartService.showAlert().subscribe(data => {
      if (data) {
        const response = this.cartService.removeProduct(id);

        if (response) {
          this.toastService.addToast(
            {
              toastType: 'success',
              toastIcon: 'success',
              toastMsg: 'Product removed',
            },
            this.toastContainer,
          );
        }
      }

      this.toggleModal();
    });
  }
}
