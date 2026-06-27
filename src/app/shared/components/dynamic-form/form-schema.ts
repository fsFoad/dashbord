/**
 * JSON schema for the dynamic form builder. A form is an array of fields;
 * each field maps to a control type. This is intentionally framework-agnostic
 * JSON so it can be authored by hand, stored in a DB, or returned by an API.
 */
export type FieldType =
  | 'text' | 'textarea' | 'number' | 'email' | 'password'
  | 'select' | 'multiselect' | 'checkbox' | 'switch'
  | 'radio' | 'date' | 'slider' | 'rating';

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldValidators {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  pattern?: string;
}

export interface FormField {
  /** unique control name (becomes the key in the form value) */
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  hint?: string;
  defaultValue?: unknown;
  options?: FieldOption[];
  validators?: FieldValidators;
  /** grid width: 1 = full row, 2 = half (on md+) */
  col?: 1 | 2;
}

export interface FormSchema {
  title?: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}
