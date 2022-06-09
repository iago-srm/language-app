import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useLanguage } from '../locale';

export const BASE_AUTH_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1`;

const axiosErrorHandler = e => {
  throw {status: e.response.status, message: e.response.data.message}
};
const axiosSuccessHandler = res => res.data;

const urlBuilder = (baseUrl: string, path: string) => `${baseUrl}/${path}`;

interface IApiContext {
  authFetchers?: { [key: string]: (url: string, body?: string) => Promise<any> };
  setHeader?: (header: string, value: any) => void;
}

const ApiContext = React.createContext<IApiContext>({})

const authFetchers = {
  get: (url: string) =>
    axios.get(urlBuilder(BASE_AUTH_URL,url))
    .then(axiosSuccessHandler).catch(axiosErrorHandler),
  post: (url: string, body: any) =>
    axios.post(urlBuilder(BASE_AUTH_URL,url), body)
    .then(axiosSuccessHandler).catch(axiosErrorHandler),
  patch: (url: string, body: any) =>
    axios.patch(urlBuilder(BASE_AUTH_URL,url), body)
    .then(axiosSuccessHandler).catch(axiosErrorHandler)
}


export function AxiosApiProvider({ children }) {

  const { language } = useLanguage();

  const setHeader = (header: string, value: any) => {
    axios.defaults.headers.common[header] = value;
  };

  useEffect(() => {
    setHeader('X-Acceppt-Language',`${language};q=1`);
  }, [language]);

  return (
    <ApiContext.Provider value={{
      authFetchers,
      setHeader
    }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useAxiosApi = () => {
  return useContext(ApiContext);
}
