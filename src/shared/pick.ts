const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[]
): Partial<T> => {
  // Create an empty object to store the picked properties
  const finalObj: Partial<T> = {};

  // Iterate over each key in the `keys` array
  for (const key of keys) {
    // Check if the `obj` parameter is truthy and has the property specified by the `key`
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      // Assign the value of the property to the corresponding key in the `finalObj` object
      finalObj[key] = obj[key];
    }
  }

  // Return the `finalObj` object with only the picked properties
  return finalObj;
};

// Export the `pick` function as the default export of the module
export default pick;
