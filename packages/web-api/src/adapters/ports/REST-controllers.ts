export type IHTTPController = (
  params: any,
  body: any,
  query: any,
  headers: {
    user?: any;
  }
) => Promise<{ response: any; statusCode: number }>;

export type IHTTPMiddleware = (req: any, headers: any) => Promise<void>;

export type IHTTPErrorHandler = (
  error: any,
  translator: any
) => Promise<{ response: any; statusCode: number }>;

export type IHTTPControllerPathDescriptor = {
  resource: string;
  isParams: boolean;
  isOptional?: boolean;
}[];

export type IHTTPMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';
export interface IHTTPControllerDescriptor<
  Controller
  // Path = IHTTPControllerPathDescriptor
> {
  middleware?: string;
  method?: IHTTPMethod;
  path?: string;
  controller: Controller;
}
// export interface IHTTPMiddlewareControllerDescriptor {
//     controller: IHTTPMiddleware
// }
