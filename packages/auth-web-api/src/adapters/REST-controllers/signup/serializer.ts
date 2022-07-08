import { ParameterNotProvidedError } from '@language-app/common';

export const serializer = (body: any) => {

  const email = body.email;
  const password = body.password;
  const confirmPassword = body.confirmPassword;
  const name = body.name;
  const role = body.role;

  if (!email) throw new ParameterNotProvidedError({ parameter: 'email' });
  if (!password) throw new ParameterNotProvidedError({ parameter: 'password' });
  if (!confirmPassword)
    throw new ParameterNotProvidedError({ parameter: 'confirmPassword' });
  // if (!role) throw new ParameterNotProvidedError({ parameter: 'role' });

  return {
    email,
    password,
    confirmPassword,
    name,
    role,
  };
};
