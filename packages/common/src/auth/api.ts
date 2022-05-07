export type LoginAPIParams = {
  email: string,
  password: string
}

export type LoginAPIResponse = {
  token: string;
}

export type GetUserAPIResponse = {
  id: string;
  avatarUrl: string;
  name: string;
}
