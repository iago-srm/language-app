export const serializer = (body: any) => {

  const verificationToken = body.verificationToken;
  const userId = body.userId;

  return {
    verificationToken,
    userId,
  };
};
