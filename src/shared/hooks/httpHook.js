import { useState, useCallback } from 'react';

export const useHttpClient = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const [errorCode, setErrorCode] = useState(null);

   const sendRequest = useCallback(
      async (url, method = 'GET', body = null, headers = {}) => {
         setErrorCode(null);
         setIsLoading(true);

         try {
            let response = await fetch(url, {
               method,
               body,
               headers,
            });

            let responseData = {};
            try {
               responseData = await response.json();
            } catch (err) {}

            setErrorCode(response.status);
            if (!response.ok) {
               throw new Error(responseData.message);
            }

            setIsLoading(false);
            return {
               data: responseData,
               status: response.status,
               ok: response.ok,
            };
         } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
         }
      },
      []
   );

   const clearError = () => {
      setError(null);
   };

   return { isLoading, error, errorCode, sendRequest, clearError };
};
