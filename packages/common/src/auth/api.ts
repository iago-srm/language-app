export type LoginAPIParams = {
  email: string,
  password: string
}

export type LoginAPIResponse = {
  token: string;
}

export type GetUserAPIResponse = {
  avatarUrl?: string;
  name: string;
  email: string;
}
