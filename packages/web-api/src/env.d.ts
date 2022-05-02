declare namespace NodeJS {
  export interface ProcessEnv {
    APP_PORT: string;
    REDIS_HOST_DEVELOPMENT: string;
    REDIS_PORT_DEVELOPMENT: string;
    REDIS_HOST_TEST: string;
    REDIS_PORT_TEST: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    POSTGRES_HOST_DEVELOPMENT: string;
    POSTGRES_PORT_DEVELOPMENT: string;
    POSTGRES_HOST_TEST: string;
    POSTGRES_PORT_TEST: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    HOME: string;
    CORS_ALLOW: string;
  }
}

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: any;
//   }
// }
