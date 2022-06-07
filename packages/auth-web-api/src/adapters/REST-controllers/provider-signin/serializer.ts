import { ParameterNotProvidedError } from '@language-app/common';

export default (body: any) => {
  const email = body.email;
  const name = body.name;
  const id = body.id;
  const image = body.image;
  const role = body.role;
  const provider = body.provider;

  if (!email) throw new ParameterNotProvidedError({ parameter: 'e-mail' });
  if (!id) throw new ParameterNotProvidedError({ parameter: 'id' });
  if (!role) throw new ParameterNotProvidedError({ parameter: 'role' });
  if (!provider) throw new ParameterNotProvidedError({ parameter: 'provider' });


  return {
    email,
    name,
    id,
    image,
    role,
    provider
  };
};
