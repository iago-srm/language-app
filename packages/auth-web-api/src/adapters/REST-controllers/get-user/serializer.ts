export const getAuthTokenFromHeader = (header: any) => {
  return header.auth.split(" ")[1];
}
