import { createContext } from 'react';
import { useAuth } from '../hooks/authHook';

export const AuthContext = createContext({
   isLoggedIn: false,
   userId: '',
   token: '',
   login: () => {},
   logout: () => {},
});

export const AuthProvider = ({ children }) => {
   const { token, isLoggedIn, login, logout, userId } = useAuth();
   let storedData = JSON.parse(localStorage.getItem('userData'));
   if (new Date(storedData?.expiration) < new Date()) {
      localStorage.removeItem('userData');
      storedData = {};
   }

   return (
      <AuthContext.Provider
         value={{
            isLoggedIn: !!storedData?.token ?? isLoggedIn,
            token: storedData?.token ?? token,
            userId: storedData?.userId ?? userId,
            login: login,
            logout: logout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
