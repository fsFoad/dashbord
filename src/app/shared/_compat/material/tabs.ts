import { Component, Directive } from '@angular/core';
@Component({ selector: 'mat-tab-group', template: '<ng-content />', standalone: true })
export class MatTabGroup {}
@Component({ selector: 'mat-tab', template: '<ng-content />', standalone: true })
export class MatTab {}
@Directive({ selector: '[matTabLabel]', standalone: true })
export class MatTabLabel {}
