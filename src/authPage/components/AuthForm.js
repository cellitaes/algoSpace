import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { NavLink, useLocation } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import EventInput from '../../shared/components/FormElements/EventInput';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/httpHook';
import './AuthForm.css';
import Modal from '../../shared/components/UIElements/Modal';
import RegisterSchema from '../../shared/util/formSchemas/registerSchema';

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
   {
      name: 'email',
      label: 'Email:',
      type: 'text',
   },
];

const hasValue = (value) => value !== '';

const AuthForm = () => {
   const { isLoading, error, sendRequest, clearError } = useHttpClient();
   const [showModal, setShowModal] = useState(false);
   const location = useLocation();

   const isRegistration = location.pathname === '/register';
   const formFields = isRegistration ? registerFields : loginFields;

   const handleAuthSubmit = async (formValues, actions) => {
      const apiURL = `${URL}/api/`;
      const resData = await sendRequest(
         apiURL,
         'POST',
         JSON.stringify(formValues),
         {
            'Content-Type': 'application/json',
         }
      );
      if (resData.msg === 'OK') {
         setShowModal(true);
         actions.setSubmitting(false);
         actions.resetForm({
            values: isRegistration ? initFormRegistryState : initLoginState,
         });
      }
   };

   const hideModal = () => {
      setShowModal(false);
   };

   const initLoginState = {
      login: '',
      password: '',
   };

   const initFormRegistryState = {
      ...initLoginState,
      confirmPassword: '',
      email: '',
   };

   return (
      <>
         {error && <ErrorModal error={error} onClear={clearError} />}
         {showModal && (
            <Modal
               onCancel={hideModal}
               header="Event successfully added!"
               show={showModal}
               footer={<Button onClick={hideModal}>Okay</Button>}
            >
               <p>Your event has been successfully added!</p>
            </Modal>
         )}
         {isLoading && <LoadingSpinner asOverlay />}
         <Card className={'eventForm dark'}>
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
                              Submit
                           </Button>
                        </div>
                     </Form>
                  );
               }}
            </Formik>
         </Card>
      </>
   );
};

export default AuthForm;
