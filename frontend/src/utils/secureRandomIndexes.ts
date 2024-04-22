/**
 * Secure Random Indexes
 * Generates secure random unique indexes for an array of objects
 *
 * @param {object[]} array - Array of Objects
 * @param {number} indexes - Number of Random Indexes
 * @returns {number[]} - Secure Random Indexes
 * @exports secureRandomIndexes
 * @example
 * secureRandomIndexes({ array: [1, 2, 3, 4, 5], indexes: 3 });
 * // Returns: [2, 4, 0]
 */
export const secureRandomIndexes = (
  array: object[],
  indexes: number
): number[] => {
  // If the number of indexes is greater than or equal the length of the array, return all indexes
  if (indexes >= array.length) return array.map((_, i) => i);

  // Create a buffer to hold the concatenated bytes of the array
  const buffer: Uint8Array = new Uint8Array(array.length * indexes);

  // Fill the buffer with cryptographically secure random values
  crypto.getRandomValues(buffer);

  // Initialize an array to store the unique random indexes
  const uniqueIndexes: number[] = [];

  // Iterate over the required number of indexes
  for (let j = 0; j < indexes; j++) {
    let sum: number = 0;

    // Sum up the random values for each index
    for (let i = 0; i < array.length; i++) sum += buffer[j * array.length + i];

    // Take modulo to get a random index within the length of the array
    const randomIndex: number = sum % array.length;

    // Ensure the index is unique
    if (!uniqueIndexes.includes(randomIndex)) uniqueIndexes.push(randomIndex);
    // If index is not unique, decrement the outer loop to try again
    else j--;
  }

  return uniqueIndexes;
};
