import { ParameterNotProvidedError } from '@language-app/common';

export default (body: any) => {
  const email = body.email;
  const password = body.password;
  const confirmPassword = body.confirmPassword;
  const name = body.name;

  if(!email) throw new ParameterNotProvidedError({ parameter: 'e-mail'});
  if(!password) throw new ParameterNotProvidedError({ parameter: 'password'});
  if(!confirmPassword) throw new ParameterNotProvidedError({ parameter: 'confirmPassword'});

  return {
    email,
    password,
    confirmPassword,
    name
  }
}
