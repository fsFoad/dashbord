import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  template: '<nav class="breadcrumb"><ng-container *ngFor="let item of items">{{item?.title ?? item}}&nbsp;/&nbsp;</ng-container></nav>'
})
export class BreadcrumbsComponent { @Input() items: unknown[] = []; }
