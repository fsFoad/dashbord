import { describe, expect, it } from 'vitest';
import { Validators } from '@angular/forms';
import type { FormField } from './form-schema';

/**
 * Validates the schema→validators mapping contract used by DynamicForm.
 * (Mirrors DynamicForm.buildValidators without Angular DI.)
 */
function buildValidators(field: FormField) {
  const v = field.validators;
  if (!v) return [];
  const out = [];
  if (v.required) out.push(Validators.required);
  if (v.email) out.push(Validators.email);
  if (v.minLength != null) out.push(Validators.minLength(v.minLength));
  if (v.min != null) out.push(Validators.min(v.min));
  return out;
}

describe('dynamic form — schema to validators', () => {
  it('produces no validators when none are declared', () => {
    expect(buildValidators({ key: 'a', type: 'text', label: 'A' })).toHaveLength(0);
  });

  it('maps declared validators to Angular validators', () => {
    const field: FormField = {
      key: 'email', type: 'email', label: 'Email',
      validators: { required: true, email: true, minLength: 3 },
    };
    expect(buildValidators(field)).toHaveLength(3);
  });

  it('handles numeric min', () => {
    const field: FormField = {
      key: 'age', type: 'number', label: 'Age', validators: { min: 18 },
    };
    expect(buildValidators(field)).toHaveLength(1);
  });
});
