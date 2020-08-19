import { ComponentFactoryResolver, Injectable } from '@angular/core';

import { AlertComponent } from './alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  addAlert(alertMsg: string, viewContainerRef: any): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent,
    );

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.alertMsg = alertMsg;
    componentRef.instance.modalRef = componentRef;
  }
}
