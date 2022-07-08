import { ParameterNotProvidedError } from '@language-app/common';

export const serializer = (body: any) => {

  const verificationToken = body.verificationToken;
  const userId = body.userId;
  const name = body.name;
  const role = body.role;

  // if (!verificationToken) throw new ParameterNotProvidedError({ parameter: 'verificationToken' });
  // if (!userId) throw new ParameterNotProvidedError({ parameter: 'userId' });

  return {
    verificationToken,
    userId,
    name,
    role
  };
};
