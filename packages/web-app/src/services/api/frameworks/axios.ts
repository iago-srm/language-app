import axios, { AxiosInstance } from 'axios';

export interface Fetcher {
  get: (url: string, query: {[k: string]: string}) => Promise<any>;
  patch: (url: string, body: any, query: any) => any;
}

// export class Fetch implements Fetcher
export class AxiosFetcher implements Fetcher {

  private _instance: AxiosInstance;

  constructor(
    private baseUrl: string
  ){
    this._instance = axios.create({ baseURL: this.baseUrl });
  }

  private _successHandler(res) {
    return res.data;
  }

  private _errorHandler(e) {
    throw {status: e.response.status, message: e.response.data ? e.response.data.message : e.message}
  };

  get(url: string, query: {[k: string]: string}) {
    console.log({query})
    return this._instance.get(url, { params: {...query}}).then(this._successHandler).catch(this._errorHandler);
  }

  put(url: string, body: any) {
    return this._instance.put(url, body).then(this._successHandler).catch(this._errorHandler);
  }

  post(url: string, body: any) {
    return this._instance.post(url, body).then(this._successHandler).catch(this._errorHandler);
  }

  patch(url: string, body: any, query: any) {
    return this._instance.patch(url, body, { params: {...query} }).then(this._successHandler).catch(this._errorHandler);
  }

  setHeader(header: string, value: string) {
    this._instance.defaults.headers.common[header] = value;
  }

  setInterceptor(response: (args) => any) {
    this._instance.interceptors.response.use(response);
  }
}

