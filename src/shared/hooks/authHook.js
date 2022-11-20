import { useCallback, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

let logoutTimer;

const setAuthState = (state, action) => {
   switch (action.type) {
      case 'LOGIN':
         return {
            token: action.token,
            userId: action.userId,
            tokenExpirationDate: action.tokenExpirationDate,
         };
      case 'LOGOUT':
         return {
            token: action.token,
            userId: action.userId,
            tokenExpirationDate: action.tokenExpirationDate,
         };
      default:
         return state;
   }
};

export const useAuth = () => {
   const [authState, dispatch] = useReducer(setAuthState, {
      token: '',
      tokenExpirationDate: null,
      userId: '',
   });

   const history = useHistory();
   const { token, tokenExpirationDate, userId } = authState;

   const login = useCallback((uid, token, expirationDate) => {
      const tokenExpirationDate =
         expirationDate || new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
      dispatch({
         type: 'LOGIN',
         token: token,
         userId: userId,
         tokenExpirationDate: tokenExpirationDate,
      });
      localStorage.setItem(
         'userData',
         JSON.stringify({
            userId: uid,
            token: token,
            expiration: tokenExpirationDate.toISOString(),
         })
      );
   }, []);

   const logout = useCallback(() => {
      dispatch({
         type: 'LOGOUT',
         token: null,
         userId: null,
         tokenExpirationDate: null,
      });
      localStorage.removeItem('userData');
      history.push('/');
   }, []);

   useEffect(() => {
      if (token && tokenExpirationDate) {
         const remainingTime =
            tokenExpirationDate.getTime() - new Date().getTime();
         logoutTimer = setTimeout(logout, remainingTime);
      } else {
         clearTimeout(logoutTimer);
      }
   }, [token, logout, tokenExpirationDate]);

   useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (
         storedData &&
         storedData.token &&
         new Date(storedData.expiration) > new Date()
      ) {
         login(
            storedData.userId,
            storedData.token,
            new Date(storedData.expiration)
         );
      }
   }, [login]);

   return { token, isLoggedIn: !!token, login, logout, userId };
};
