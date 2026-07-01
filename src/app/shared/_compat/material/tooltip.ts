import { Directive, Input } from '@angular/core';
@Directive({ selector: '[matTooltip]', standalone: true })
export class MatTooltip { @Input() matTooltip = ''; }
