import { FC } from "react";
import { AuthFieldsPattern, FieldProps } from "../../../types/auth";

import "./EventInput.css";

const EventInput: FC<{
  formField: AuthFieldsPattern;
  touched: { [field: string]: boolean };
  errors: { [field: string]: string };
  field: FieldProps;
  className: string;
}> = ({ formField, touched, errors, field, className }) => {
  return (
    <div className="form-field--center">
      <label className={className}>{formField.label}</label>
      <input
        {...field}
        className={`${field.name} ${
          touched[field.name] && errors[field.name] && "error"
        }`}
        autoComplete="on"
        type={formField.type}
        data-testid={formField.name}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

export default EventInput;
