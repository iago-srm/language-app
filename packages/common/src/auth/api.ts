export type LoginAPIParams = {
  email: string,
  password: string
}

export type LoginAPIResponse = {
  token: string;
}

export type GetUserAPIResponse = {
  image?: string;
  name?: string;
  email?: string;
}
