import { ParameterNotProvidedError } from '@language-app/common-utils';

export const controllerSerializer = (body: { [k: string]: string }, fields: ({ name: string, optional?: boolean, type?: "string" | "array" } | string) []) => {

  const values = {};

  fields.forEach((field) => {
    //optional field
    if(typeof field !== 'string' && field.optional) { 
      if(typeof field !== 'string' && field.type === "array") //array field
        values[field.name] = body[field.name] && body[field.name].split(",") 
      else  // string field
        values[field.name] = body[field.name];
      return;
    }

    const fieldName = typeof field !== 'string' ? field.name : field;
    //non-optional field
    if((typeof field !== 'string' && !field.optional) || typeof field === 'string') {
      // field does not exist
      if(body[fieldName] === undefined) throw new ParameterNotProvidedError({ parameter: fieldName }); 
      // field is an array
      if(typeof field !== 'string' && field.type === "array") {
        values[fieldName] = body[fieldName].split(",") 
      }
      // field is a string
      else values[fieldName] = body[fieldName]; 
    }
  });

  return {
    ...values
  } as Record<string, any>
}
