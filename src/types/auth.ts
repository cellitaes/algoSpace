export interface AuthValues {
  login: string;
  password: string;
  confirmPassword?: string;
}

export type FieldProps = {
  name: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
};

export type AuthFieldsPattern = {
  name: string;
  label: string;
  type: string;
};
