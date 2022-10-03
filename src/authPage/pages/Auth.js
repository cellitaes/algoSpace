import Sky from '../../mainPage/components/Sky';
import AuthForm from '../components/AuthForm';

import './Auth.css';

const Auth = () => {
   return (
      <>
         <Sky />
         <div className="auth-form">
            <AuthForm />
         </div>
      </>
   );
};

export default Auth;
