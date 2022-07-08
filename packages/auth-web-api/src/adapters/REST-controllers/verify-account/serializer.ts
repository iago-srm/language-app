export const serializeBody = (body: any) => {

  const verified = body.verified;

  return {
    verified
  };
};

export const serializeParams = (params: any) => {

  const token = params.token;

  return {
    token
  };
};

export const serializeQuery = (query: any) => {

  const userId = query.userId;

  return {
    userId
  };
};
