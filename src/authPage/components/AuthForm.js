import React, { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink, useLocation, useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import EventInput from '../../shared/components/FormElements/EventInput';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './AuthForm.css';
import Modal from '../../shared/components/UIElements/Modal';
import RegisterSchema from '../../shared/util/formSchemas/registerSchema';

import { AuthContext } from '../../shared/context/AuthContext.js';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { useModal } from '../../shared/hooks/modalHook';
import { URL } from '../../config';
import useScrollBlock from '../../shared/hooks/useScrollBlock';
import { useEffect } from 'react';

const loginFields = [
   {
      name: 'login',
      label: 'Login:',
      type: 'text',
   },
   {
      name: 'password',
      label: 'Hasło:',
      type: 'password',
   },
];

const registerFields = [
   ...loginFields,
   {
      name: 'confirmPassword',
      label: 'Potwierdź hasło:',
      type: 'password',
   },
];

const hasValue = (value) => value !== '';

const AuthForm = () => {
   const location = useLocation();
   const history = useHistory();

   const { login } = useContext(AuthContext);

   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const [open, openModal, closeModal] = useModal();
   const { blockScroll, allowScroll } = useScrollBlock();

   const isRegistration = location.pathname === '/register';
   const formFields = isRegistration ? registerFields : loginFields;

   useEffect(() => {
      blockScroll();
      return () => {
         allowScroll();
      };
   }, []);

   const handleAuthSubmit = async (formValues, actions) => {
      const authUrl = `${URL}/${isRegistration ? 'users/register' : 'login'}`;
      const method = 'POST';
      const body = isRegistration
         ? JSON.stringify({
              username: formValues.login,
              password1: formValues.password,
              password2: formValues.confirmPassword,
           })
         : JSON.stringify({
              username: formValues.login,
              password: formValues.password,
           });
      const headers = {
         'Content-Type': 'application/json',
      };

      const response = await sendRequest(authUrl, method, body, headers);
      const { data, ok } = response;

      if (isRegistration && ok) {
         history.push('/login');
         actions.resetForm();
         openModal();
      } else if (ok) {
         const token = data.token.split(' ')[1];
         login(data.username, token);
         actions.resetForm();
         history.push('/');
      }
   };

   const initLoginState = {
      login: '',
      password: '',
   };

   const initFormRegistryState = {
      ...initLoginState,
      confirmPassword: '',
   };

   return (
      <>
         {error && <ErrorModal error={error} onClear={clearError} />}
         {open && (
            <Modal
               onCancel={closeModal}
               header="Pomyślnie utworzono konto!"
               show={open}
               footer={<Button onClick={closeModal}>Okay</Button>}
            >
               <p>Twoje konto zostało utworzone. Możesz teraz zalogować się!</p>
            </Modal>
         )}
         {isLoading && <LoadingSpinner asOverlay />}
         <h1>{isRegistration ? 'Stwórz konto' : 'Zaloguj się'}</h1>
         <Formik
            initialValues={
               isRegistration ? initFormRegistryState : initLoginState
            }
            validationSchema={isRegistration && RegisterSchema}
            onSubmit={(values, actions) => {
               handleAuthSubmit(values, actions);
            }}
         >
            {(props) => {
               const everyItemHasValue = Object.values(props.values).every(
                  hasValue
               );
               return (
                  <Form>
                     {formFields.map((formField) => (
                        <Field key={formField.name} name={formField.name}>
                           {({ field, form: { touched, errors } }) => (
                              <EventInput
                                 formField={formField}
                                 touched={touched}
                                 errors={errors}
                                 field={field}
                                 className="color-secondary"
                              />
                           )}
                        </Field>
                     ))}
                     <div className="center">
                        <span className="question">
                           {isRegistration
                              ? 'Masz już konto? '
                              : 'Nie masz konta? '}
                        </span>
                        {isRegistration ? (
                           <NavLink
                              to="/login"
                              exact
                              className="question-navlink"
                           >
                              Zaloguj się
                           </NavLink>
                        ) : (
                           <NavLink
                              to="/register"
                              exact
                              className="question-navlink"
                           >
                              Zarejestruj się
                           </NavLink>
                        )}
                     </div>
                     <div className="eventForm__button eventForm__button--spacing">
                        <Button
                           disabled={
                              !isRegistration
                                 ? false
                                 : !everyItemHasValue || !props.isValid
                           }
                           type="submit"
                        >
                           {isRegistration ? 'Zarejestruj się' : 'Zaloguj się'}
                        </Button>
                     </div>
                  </Form>
               );
            }}
         </Formik>
      </>
   );
};

export default AuthForm;
