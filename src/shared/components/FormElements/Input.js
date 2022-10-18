import React, { useReducer, useEffect } from 'react';

import './Input.css';

const inputReducer = (state, action) => {
   switch (action.type) {
      case 'CHANGE':
         return {
            ...state,
            value: action.val,
            checked: action.check,
         };
      case 'TOUCH': {
         return {
            ...state,
            isTouched: true,
         };
      }
      default:
         return state;
   }
};

const Input = (props) => {
   const init = {
      value: props.initialValue || '',
   };

   const [inputState, dispatch] = useReducer(inputReducer, init);

   const { id, onInput } = props;
   const { value } = inputState;

   useEffect(() => {
      onInput({ id, value });
   }, [id, value, onInput]);

   const changeHandler = (event) => {
      dispatch({
         type: 'CHANGE',
         val: event.target.value,
      });
   };

   const element =
      props.element !== 'textarea' ? (
         <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
            max={props.max}
         />
      ) : (
         <textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            value={inputState.value}
         />
      );

   return (
      <div className={`form-control`}>
         <label htmlFor={props.id}>{props.label}</label>
         {element}
      </div>
   );
};

export default Input;
