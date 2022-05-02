export interface ITokenService {
  generate: (payload: any) => string;
  verify: (token: string) => Promise<any>;
}
