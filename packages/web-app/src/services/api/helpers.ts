export const insertPathParam = (
  path: string,
  position: number,
  param: string
) => {
  const result = path.split("/");
  result.splice(position, 1, param);
  return result.join("/");
};
