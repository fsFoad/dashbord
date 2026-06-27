import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,
} from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { Password } from 'primeng/password';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Slider } from 'primeng/slider';
import { Rating } from 'primeng/rating';
import { DatePickerComponent } from '../date-picker/date-picker';
import { FormField, FormSchema } from './form-schema';

/**
 * Renders a reactive form from a JSON FormSchema. Builds controls + validators
 * from the schema, lays them out on a 2-col grid, and emits the typed value on
 * submit. Pure rendering — the schema is the contract.
 */
@Component({
  selector: 'app-dynamic-form',
  imports: [
    ReactiveFormsModule, TranslocoModule, ButtonModule, InputTextModule, Textarea,
    InputNumber, Password, Select, MultiSelect, Checkbox, RadioButton, ToggleSwitch,
    Slider, Rating, DatePickerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-form.html',
})
export class DynamicForm {
  private readonly fb = inject(FormBuilder);

  readonly schema = input.required<FormSchema>();
  readonly submitted = output<Record<string, unknown>>();

  protected readonly form = computed<FormGroup>(() => {
    const group: Record<string, FormControl> = {};
    for (const field of this.schema().fields) {
      group[field.key] = new FormControl(
        field.defaultValue ?? this.emptyFor(field),
        this.buildValidators(field),
      );
    }
    return this.fb.group(group);
  });

  protected control(key: string): FormControl {
    return this.form().get(key) as FormControl;
  }

  protected invalid(key: string): boolean {
    const c = this.control(key);
    return c.touched && c.invalid;
  }

  protected firstError(key: string): { code: string; params?: Record<string, unknown> } | null {
    const errors = this.control(key).errors;
    if (!errors) return null;
    if (errors['required']) return { code: 'validation.required' };
    if (errors['email']) return { code: 'validation.email' };
    if (errors['minlength']) return { code: 'validation.min', params: { n: errors['minlength'].requiredLength } };
    if (errors['maxlength']) return { code: 'validation.max', params: { n: errors['maxlength'].requiredLength } };
    if (errors['min']) return { code: 'validation.minVal', params: { n: errors['min'].min } };
    if (errors['max']) return { code: 'validation.maxVal', params: { n: errors['max'].max } };
    if (errors['pattern']) return { code: 'validation.pattern' };
    return { code: 'validation.invalid' };
  }

  protected submit(): void {
    const form = this.form();
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    this.submitted.emit(form.getRawValue());
  }

  protected colClass(field: FormField): string {
    return field.col === 2 ? 'md:col-span-1' : 'md:col-span-2';
  }

  private emptyFor(field: FormField): unknown {
    if (field.type === 'multiselect') return [];
    if (field.type === 'checkbox' || field.type === 'switch') return false;
    if (field.type === 'number' || field.type === 'slider' || field.type === 'rating') return null;
    return '';
  }

  private buildValidators(field: FormField) {
    const v = field.validators;
    if (!v) return [];
    const out = [];
    if (v.required) out.push(Validators.required);
    if (v.email) out.push(Validators.email);
    if (v.minLength != null) out.push(Validators.minLength(v.minLength));
    if (v.maxLength != null) out.push(Validators.maxLength(v.maxLength));
    if (v.min != null) out.push(Validators.min(v.min));
    if (v.max != null) out.push(Validators.max(v.max));
    if (v.pattern) out.push(Validators.pattern(v.pattern));
    return out;
  }
}
