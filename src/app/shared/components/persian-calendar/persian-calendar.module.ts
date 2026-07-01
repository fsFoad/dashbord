import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-persian-calendar',
  standalone: true,
  template: `<div></div>`,
})
export class PersianCalendarComponent {}

@NgModule({
  exports: [PersianCalendarComponent],
  imports: [
    PersianCalendarComponent
  ],
  declarations: []
})
export class PersianCalendarModule {}
