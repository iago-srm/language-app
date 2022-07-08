export const serializer = (body: { [k: string]: string }, fields: string[]) => {

  const values = {};

  fields.forEach((field) => {
    values[field] = body[field]
  });

  return {
    ...values
  } as Record<typeof fields[number], string>
}
