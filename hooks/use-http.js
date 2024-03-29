import axios from "axios";
import React, { useCallback, useState } from "react";

const useHttp = (initialLoadingState) => {
  const [isLoading, setIsLoading] = useState(initialLoadingState);
  const [error, setError] = useState();
  const sendRequest = useCallback(
    async (url, method, body = null, headers = {}) => {
      setIsLoading(true);
      try {
        const resp = await axios({
          url,
          method,
          data: body,
          headers,
        });

        const data = resp.data;
        if (!(resp.status === 200 || resp.status === 201)) {
          console.log(resp, data);
          throw new Error("Something went wrong");
        }
        setIsLoading(false);
        return data;
      } catch (err) {
        setIsLoading(false);
        setError(err.response.data.message);
        return {
          error: true,
        };
      }
    },
    []
  );

  const clearError = () => {
    setError();
  };

  const generateError = (errorText) => {
    setError(errorText);
  };

  const toggleLoading = () => {
    setIsLoading((curr) => !curr);
  };

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
    toggleLoading,
    generateError,
  };
};

export default useHttp;
