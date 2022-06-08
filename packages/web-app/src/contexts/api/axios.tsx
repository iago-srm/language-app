import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useLanguage } from '../locale';

export const BASE_AUTH_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1`;

const axiosErrorHandler = e => {
  throw {status: e.response.status, message: e.response.data.message}
};

interface IApiContext {
  authGetFetcher?: (url: string) => Promise<any>;
  authPostFetcher?: (url: string, body: any) => Promise<any>;
  authPatchFetcher?: (url: string, body: any) => Promise<any>;
  setHeader?: (header: string, value: any) => void;
}

const ApiContext = React.createContext<IApiContext>({})

const authGetFetcher = (url: string) =>
  axios.get(`${BASE_AUTH_URL}/${url}`).then(res => res.data).catch(axiosErrorHandler);
const authPostFetcher = (url: string, body: any) =>
  axios.post(`${BASE_AUTH_URL}/${url}`, body).then(res => res.data).catch(axiosErrorHandler);
const authPatchFetcher = (url: string, body: any) =>
  axios.patch(`${BASE_AUTH_URL}/${url}`, body).then(res => res.data).catch(axiosErrorHandler);

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
      authGetFetcher,
      authPostFetcher,
      authPatchFetcher,
      setHeader
    }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useAxiosApi = () => {
  return useContext(ApiContext);
}
