import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({ selector: 'app-message-selector', template: '', standalone: true })
export class MessageSelectorComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Output() selected = new EventEmitter<unknown>();
}
