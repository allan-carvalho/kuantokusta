import { ComponentFactoryResolver, Injectable } from '@angular/core';

import { ToastModel } from './toast.model';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  addToast(
    { toastType, toastIcon, toastMsg }: ToastModel,
    viewContainerRef: any,
  ): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ToastComponent,
    );

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.toastType = `${toastType}_toast`;
    componentRef.instance.toastIcon = `${toastIcon}_icon`;
    componentRef.instance.toastMsg = toastMsg;

    setTimeout(() => {
      componentRef.destroy();
    }, 3000);
  }
}
