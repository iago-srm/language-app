import { ParameterNotProvidedError } from '@language-app/common-utils';

export const controllerSerializer = (body: { [k: string]: string }, fields: ({ name: string, optional?: boolean } | string) []) => {

  const values = {};

  fields.forEach((field) => {
    if(typeof field !== 'string' && field.optional) {
      values[field.name] = body[field.name];
      return;
    }
    const fieldName = typeof field !== 'string' ? field.name : field;
    if((typeof field !== 'string' && !field.optional) || typeof field === 'string')
    if(body[fieldName] === undefined) throw new ParameterNotProvidedError({ parameter: fieldName });
    else if (typeof field ===  'string') values[field] = body[field];
  });

  return {
    ...values
  } as Record<string, string>
}
