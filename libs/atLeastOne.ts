export function atLeastOne<T>(obj: T, fields: (keyof T)[]): boolean {
  return fields.some((field) => {
    const value = obj[field];
    return value !== undefined && value !== null && value !== '';
  });
}
