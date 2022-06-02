import axios, { AxiosInstance } from 'axios';

// console.log(process.env)
export const BASE_AUTH_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1`;

const axiosErrorHandler = e => {
  // console.log({e: e.response.data})
  throw {status: e.response.status, message: e.response.data.message}
};

// class AxiosFetchers {
//   public authAxiosGetFetcher;
//   public authAxiosPostFetcher;
//   private axiosInstances = {
//     auth: axios.create({
//       baseURL: BASE_AUTH_URL,
//       headers: {
//         'accept-language': 'pt-BR;q=1'
//       }
//     })
//   }
//   setAxiosLanguage = (language: string) => {
//     // for(let instanceName of Object.keys(axiosInstances)) {
//     //   axiosInstances[instanceName].defaults.headers.common['Accept-Language'] =
//     //   `${language};q=1`;
//     // }
//     // console.log(axiosInstances.auth.defaults)

//     this.authAxiosGetFetcher = (url: string) => {
//       return this.axiosInstances.auth.get(url).then(res => res.data).catch(axiosErrorHandler);
//     }
//     this.authAxiosPostFetcher = (url: string, body: any) =>
//       this.axiosInstances.auth.post(url, body).then(res => res.data).catch(axiosErrorHandler);

//   }
// }

// export default new AxiosFetchers();

const auth = axios.create({
  baseURL: BASE_AUTH_URL,
  headers: {
    'accept-language': `cu;q=1`
  }
});

let authAxiosGetFetcher = (url: string) =>
  auth.get(url).then(res => res.data).catch(axiosErrorHandler);
let authAxiosPostFetcher = (url: string, body: any) =>
  auth.post(url, body).then(res => res.data).catch(axiosErrorHandler);

export const getAuthAxiosGetFetcher = () => authAxiosGetFetcher;
export const getAuthAxiosPostFetcher = () => {
  console.log('getting')
  return authAxiosPostFetcher;
}

export const setAxiosLanguage = (language: string) => {
  console.log({language});
  authAxiosGetFetcher = (url: string) =>
    axios.create({
      baseURL: BASE_AUTH_URL,
      headers: {
        'accept-language': `${language};q=1`
      }
    }).get(url).then(res => res.data).catch(axiosErrorHandler);
  authAxiosPostFetcher = (url: string, body: any) =>
    axios.create({
      baseURL: BASE_AUTH_URL,
      headers: {
        'accept-language': `${language};q=1`
      }
    }).post(url, body).then(res => res.data).catch(axiosErrorHandler);
}

setAxiosLanguage('fr');
