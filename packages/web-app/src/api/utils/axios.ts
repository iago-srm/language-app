
// console.log(process.env)



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
