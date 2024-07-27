/**
 * Creates a new object by executing functions in the input object and storing their results.
 * @param {object} obj - The input object.
 * @returns {object} - The new object with the executed function results.
 */
export function createDefaultForm(obj: { [key: string]: any }): object {
  const newObj: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === "function") {
        newObj[key] = value(); // Execute the function and store the result
      } else {
        newObj[key] = value; // Copy non-function values as-is
      }
    }
  }

  return newObj;
}

// Core module exports
export default createDefaultForm;
