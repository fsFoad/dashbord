import { Component } from '@angular/core';
@Component({
  selector: 'app-blur-overlay',
  standalone: true,
  template: '<div style="position:relative"><ng-content /></div>'
})
export class BlurOverlayComponent {}
