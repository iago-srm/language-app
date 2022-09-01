import { ParameterNotProvidedError } from '@language-app/common-utils';

export const controllerSerializer = (body: { [k: string]: string }, fields: ({ name: string, optional?: boolean } | string) []) => {

  const values = {};

  fields.forEach((field) => {
    if(typeof field !== 'string') {
      if(!field.optional && !body[field.name]) throw new ParameterNotProvidedError({ parameter: field.name });
      values[field.name] = body[field.name];
    }
    else if (typeof field ===  'string') values[field] = body[field];
  });

  return {
    ...values
  } as Record<string, string>
}
