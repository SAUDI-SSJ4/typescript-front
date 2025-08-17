export interface IOption {
  label: string;
  value: string;
}
export interface IFormField {
  name: string;
  label?: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "checkbox"
    | "radio"
    | "select"
    | "phone"
    | "hidden"
    | "textarea"
    | "image"
    | "file"
    | "otp";
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  options?: IOption[];
  id?: string;
}
export interface IFormFieldsVariables {
  slug: string;
}
