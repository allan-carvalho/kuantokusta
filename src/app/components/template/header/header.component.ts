import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  items = 0;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService
      .getTotalProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.items = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
