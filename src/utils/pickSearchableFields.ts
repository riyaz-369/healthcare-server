export const pickSearchableFields = (
  obj: Record<string, unknown>,
  keys: string[]
) => {
  const finalQueryObj: Record<string, unknown> = {};

  for (const key of keys) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
      finalQueryObj[key] = obj[key];
    }
  }
  return finalQueryObj;
};
