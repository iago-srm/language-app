import axios, { AxiosInstance } from 'axios';

// console.log(process.env)
export const BASE_AUTH_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1`;

const axiosErrorHandler = e => {
  console.log({e})
  throw {status: e.response.status, message: e.response.data.message}
};

const axiosInstances = {
  auth: axios.create({ baseURL: BASE_AUTH_URL })
}

export const setAxiosLanguage = (language: string) => {
  for(let instanceName of Object.keys(axiosInstances)) {
    axiosInstances[instanceName].defaults.headers.common['Accept-Language'] =
    `${language};q=1`;
  }
}

export const authAxiosGetFetcher = (url: string) =>
  axiosInstances.auth.get(url).then(res => res.data).catch(axiosErrorHandler);
export const authAxiosPostFetcher = (url: string, body: any) =>
  axiosInstances.auth.post(url, body).then(res => res.data).catch(axiosErrorHandler);
