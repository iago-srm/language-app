import { ParameterNotProvidedError } from '@language-app/common';

export default (body: any) => {
  const email = body.email;
  const password = body.password;

  if(!email) throw new ParameterNotProvidedError({ parameter: 'e-mail'});
  if(!password) throw new ParameterNotProvidedError({ parameter: 'password'});

  return {
    email,
    password,
  }
}
