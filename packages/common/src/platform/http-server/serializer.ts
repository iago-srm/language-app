import { ParameterNotProvidedError } from '@language-app/common';

export const controllerSerializer = (body: { [k: string]: string }, fields: ({ name: string, optional?: boolean } | string) []) => {

  const values = {};

  fields.forEach((field) => {
    if(typeof field !== 'string') {
      if(!field.optional && !values[field.name]) throw new ParameterNotProvidedError({ parameter: name });
      values[field.name] = body[field.name];
    }
    else if (typeof field ===  'string') values[field] = body[field];
  });

  return {
    ...values
  } as Record<string, string>
}
