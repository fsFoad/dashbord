// @ts-nocheck
// Pure stubs — gateway uses old PrimeNG accordion API that no longer exists
import { Component, Input } from '@angular/core';

@Component({ selector: 'p-accordion', standalone: true, template: `<ng-content />` })
export class Accordion {
  @Input() multiple: boolean = false;
  @Input() expandIcon: string = '';
  @Input() collapseIcon: string = '';
  @Input() activeIndex: any = null;
}

@Component({ selector: 'p-accordionTab, p-accordion-panel', standalone: true, template: `<ng-content />` })
export class AccordionPanel {
  @Input() header: string = '';
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: any = null;
}

@Component({ selector: 'p-accordion-header', standalone: true, template: `<ng-content />` })
export class AccordionHeader {}

@Component({ selector: 'p-accordion-content', standalone: true, template: `<ng-content />` })
export class AccordionContent {}

export { AccordionPanel as AccordionTab };
export { Accordion as AccordionModule };
