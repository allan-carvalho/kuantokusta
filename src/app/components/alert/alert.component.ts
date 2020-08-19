import { Component } from '@angular/core';
import { AlertEventService } from './alert.event.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  alertMsg: string;

  modalRef: any;

  constructor(private alertEventService: AlertEventService) {}

  action(type: boolean): void {
    if (type) {
      this.alertEventService.userResponse(true);
      this.modalRef.destroy();
    } else {
      this.alertEventService.userResponse(false);
      this.modalRef.destroy();
    }
  }
}
