/** Groups together objects with equal property values in an array.
 * Technically, it turns an array into an object containing grouped arrays,
 * and the property value that is grouped by is the key for each property
 * in the new object.
 * Example:
 * [{ a: Name1, b: 360 }, [a: Name1, b: 130 }] =>
 * { Name1: [{ a: Name1, b: 360 }, { a: Name1, b: 130 }] } */
export const groupArrayByProperty = <T extends object>(data: T[], key: keyof T): { [key: string]: T[] } => {
  return data.reduce(
    (storage, item) => {
      const group = item[key] as string
      storage[group] = storage[group] || []
      storage[group].push(item)
      return storage
    },
    {} as { [key: string]: T[] },
  )
}
