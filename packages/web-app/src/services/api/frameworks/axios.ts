import axios, { AxiosInstance } from 'axios';

export class AxiosFetcher {

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
    throw {status: e.response.status, message: e.response.data.message}
  };

  get(url: string) {
    return this._instance.get(url).then(this._successHandler).catch(this._errorHandler);
  }

  post(url: string, body: any) {
    return this._instance.post(url, body).then(this._successHandler).catch(this._errorHandler);
  }

  patch(url: string, body: any) {
    return this._instance.patch(url, body).then(this._successHandler).catch(this._errorHandler);
  }

  setHeader(header: string, value: string) {
    this._instance.defaults.headers.common[header] = value;
  }

  setInterceptor(response: (args) => any) {
    this._instance.interceptors.response.use(response);
  }
}

