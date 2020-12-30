export const isNullEmptyOrUndefined = (value: any) => {
  return value === null || value === undefined || value === {} || value === "";
};
