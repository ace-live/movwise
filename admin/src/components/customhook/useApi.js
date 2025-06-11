import { useState, useCallback } from "react";
import axios from "axios";
import { baseUrl } from "../../../constant";

const useApi = () => {
  const [state, setState] = useState({ data: null, loading: false, error: null });

  const apiRequest = useCallback(
    async (method, endpoint, payload = null, customHeaders = {}) => {
      setState({ data: null, loading: true, error: null });
      const token = localStorage.getItem("auth")
      try {
        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
          ...customHeaders,
        };

        const response = await axios({
          method,
          url: `${baseUrl}${endpoint}`,
          data: payload,
          headers,
        });

        setState({ data: response.data, loading: false, error: null });
        return {
          data: response.data,
          error: null,
          authorization: response.headers?.authorization
        };
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setState({ data: null, loading: false, error: errorMessage });

        return {
          data: null,
          error: errorMessage,
          authorization: err.response?.headers?.authorization
        };
      }
    },
    []
  );

  return { ...state, apiRequest };
};

export default useApi;
