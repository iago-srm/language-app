type Fetcher = (url: string, body?: string) => Promise<any>;

type HTTPMethods = "get" | "post" | "patch" | "delete" | "put";

export type APIFetchers = Partial<Record<HTTPMethods, Fetcher>>;

export const urlBuilder = (baseUrl: string, path: string) =>
  `${baseUrl}/${path}`;

export type APIs = { [key: string]: APIFetchers };
// export type GetFetchers = (baseUrl: string) => IFetchers;
