import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    ViewChild,
    ElementRef
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'amount-box',
    standalone: true,
    imports: [CommonModule, InputText],
    template: `
        <div class="relative w-full flex">
            <input
                #inputRef
                type="text"
                class="normal-input"
                pInputText
                [disabled]="disabled"
                [placeholder]="placeholder"
                [value]="displayValue"
                maxlength="16"
                (input)="onInput($event)"
                (blur)="handleBlur($event)"
                (focus)="focus.emit($event)"
                (change)="change.emit($event)"
                (keydown)="handleKeydown($event)"
            />
            <span class="flex items-center px-1 text-gray-500 text-sm">
        {{ currencyType }}
      </span>
        </div>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmountBoxComponent),
            multi: true
        }
    ]
})
export class AmountBoxComponent implements ControlValueAccessor {
    @Input() placeholder = '';
    @Input() currencyType = 'ریال';
    @Input() disabled = false;

    @Output() focus = new EventEmitter<FocusEvent>();
    @Output() onBlur = new EventEmitter<FocusEvent>();
    @Output() change = new EventEmitter<Event>();
    @Output() keydown = new EventEmitter<KeyboardEvent>();
    @Output() enter = new EventEmitter<KeyboardEvent>();

    @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

    private _value: number | null = null;
    displayValue = '';

    onChange: (value: number | null) => void = () => {};
    onTouched: () => void = () => {};

    writeValue(value: number | null): void {
        this._value = value;
        this.displayValue = value != null ? this.formatNumber(value) : '';
    }

    registerOnChange(fn: (value: number | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInput(event: Event): void {
        const inputEl = event.target as HTMLInputElement;
        const raw = inputEl.value.replace(/,/g, '').slice(0, 16);
        const cursorPos = inputEl.selectionStart ?? 0;

        const parsed = parseFloat(raw);
        this._value = isNaN(parsed) ? 0 : parsed;

        this.displayValue = this.formatNumber(this._value);
        this.onChange(this._value);
        this.onTouched();

        // نگه‌داشتن موقعیت کرسر
        setTimeout(() => {
            const el = this.inputRef?.nativeElement;
            if (el) {
                const newLength = el.value.length;
                const offset = newLength - raw.length;
                const newPos = cursorPos + offset;
                el.setSelectionRange(newPos, newPos);
            }
        });
    }

    handleBlur(event: FocusEvent): void {
        this.onTouched();
        this.onBlur.emit(event);
    }

    handleKeydown(event: KeyboardEvent): void {
        this.keydown.emit(event);
        if (event.key === 'Enter') {
            this.enter.emit(event);
        }
    }

    formatNumber(value: number): string {
        return value.toLocaleString('en-US');
    }
}
