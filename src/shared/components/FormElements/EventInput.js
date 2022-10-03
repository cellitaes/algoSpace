import './EventInput.css';

const EventInput = ({ formField, touched, errors, field, className }) => {
   return (
      <div className="form-field--center">
         <label className={className}>{formField.label}</label>
         <input
            {...field}
            className={`${
               touched[field.name] && errors[field.name] && 'error'
            }`}
            type={formField.type}
            min={formField.min}
            data-testid={formField.name}
         />
         {touched[field.name] && errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
         )}
      </div>
   );
};

export default EventInput;
