import { useState, useCallback } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: string | null = null,
      headers: any = {}
    ) => {
      setErrorCode(null);
      setIsLoading(true);

      try {
        let response: any = await fetch(url, {
          method,
          body,
          headers,
        });

        let responseData: any = {};
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
      } catch (err: any) {
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
