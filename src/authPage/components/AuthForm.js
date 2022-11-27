import React, { useContext, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink, useLocation, useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import CustomSnackbar from '../../shared/components/UIElements/Snackbar';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import EventInput from '../../shared/components/FormElements/EventInput';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './AuthForm.css';
import RegisterSchema from '../../shared/util/formSchemas/registerSchema';

import { AuthContext } from '../../shared/context/AuthContext.js';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { usePopUp } from '../../shared/hooks/modalHook';
import { URL } from '../../config';
import useScrollBlock from '../../shared/hooks/useScrollBlock';

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
let timeoutIdx;

const AuthForm = () => {
   const [formError, setFormError] = useState('');
   const [severity, setSeverity] = useState('');
   const [usernameCheck, setUsernameCheck] = useState(false);

   const location = useLocation();
   const history = useHistory();

   const { login } = useContext(AuthContext);

   const { isLoading, error, errorCode, sendRequest, clearError } =
      useHttpClient();
   const [open, content, setPopUpContent, openSnackbar, closeSnackbar] =
      usePopUp();
   const { blockScroll, allowScroll } = useScrollBlock();

   const isRegistration = location.pathname === '/register';
   const formFields = isRegistration ? registerFields : loginFields;

   useEffect(() => {
      blockScroll();
      return () => {
         allowScroll();
      };
   }, [blockScroll, allowScroll]);

   useEffect(() => {
      setFormError('');
   }, [isRegistration]);

   useEffect(() => {
      switch (errorCode) {
         case 201:
            setSeverity('success');
            setPopUpContent('Pomyślnie utworzono nowe konto');
            break;
         case 401:
            setSeverity('error');
            setPopUpContent('Niepoprawna nazwa użytkownika bądź hasło!');
            break;
         case 500:
            setSeverity('error');
            setPopUpContent('Coś poszło nie tak!');
            break;
         default:
            return;
      }

      if (errorCode) openSnackbar();
   }, [errorCode, openSnackbar, setPopUpContent]);

   const handleAuthSubmit = async (formValues) => {
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

      setFormError('');
      const response = await sendRequest(authUrl, method, body, headers);

      const { data, ok } = response;
      if (isRegistration && ok) {
         history.push('/login');
      } else if (ok) {
         const token = data.token.split(' ')[1];
         login(data.username, token);
         history.push('/');
      }
   };

   const handleCheckUsername = async (formFields) => {
      if (
         formFields?.target?.dataset?.testid !== 'login' ||
         !formFields?.target?.value ||
         !isRegistration
      )
         return;
      setUsernameCheck(true);
      setFormError('');
      clearTimeout(timeoutIdx);
      timeoutIdx = setTimeout(() => {
         const checkUsername = async () => {
            const authUrl = `${URL}/users/username-availability`;
            const method = 'POST';
            const body = formFields?.target?.defaultValue;
            const headers = {
               'Content-Type': 'text/plain',
            };

            const response = await sendRequest(authUrl, method, body, headers);
            const { data } = response;
            if (!data) {
               setFormError('Nazwa użtkownika jest już zajęta');
            }
            setUsernameCheck(false);
         };
         checkUsername();
      }, 500);
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
         <CustomSnackbar
            open={open}
            closeSnackbar={closeSnackbar}
            severity={severity}
            text={content}
         />
         {isLoading && <LoadingSpinner asOverlay />}
         <h1>{isRegistration ? 'Stwórz konto' : 'Zaloguj się'}</h1>
         <Formik
            initialValues={
               isRegistration ? initFormRegistryState : initLoginState
            }
            enableReinitialize={true}
            validationSchema={isRegistration && RegisterSchema}
            onSubmit={(values) => {
               handleAuthSubmit(values);
            }}
         >
            {(props) => {
               const everyItemHasValue = Object.values(props.values).every(
                  hasValue
               );
               return (
                  <Form
                     onChange={(formFields) => handleCheckUsername(formFields)}
                  >
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
                     {formError && isRegistration && (
                        <div className="error">{formError}</div>
                     )}
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
                              (isRegistration &&
                                 (!everyItemHasValue || !props.isValid)) ||
                              isLoading ||
                              usernameCheck ||
                              formError
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
