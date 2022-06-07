import { ParameterNotProvidedError } from '@language-app/common';

export const serializer = (body: any) => {

  const password = body.password;
  const confirmPassword = body.confirmPassword;
  const name = body.name;
  const role = body.role;

  if (!password) throw new ParameterNotProvidedError({ parameter: 'password' });
  if (!confirmPassword)
    throw new ParameterNotProvidedError({ parameter: 'confirmPassword' });

  return {
    password,
    confirmPassword,
    name,
    role,
  };
};
