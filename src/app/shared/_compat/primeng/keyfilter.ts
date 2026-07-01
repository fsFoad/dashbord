import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[pKeyFilter]',
  standalone: true,
})
export class KeyFilter {
  @Input('pKeyFilter') pattern: string | RegExp = '';
  @Input() pValidateOnly: boolean = false;
}

export { KeyFilter as KeyFilterModule };
