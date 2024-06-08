/**
 * Secure Random Indexes
 * Generates secure random unique indexes for an array of objects
 *
 * @param {number} arrayLength - Length of the Array
 * @param {number} indexes - Number of Random Indexes
 * @returns {number[]} - Secure Random Indexes
 * @exports secureRandomIndexes
 * @example
 * secureRandomIndexes({ arrayLength: 5, indexes: 3 });
 * // Returns: [2, 4, 0]
 */
export const secureRandomIndexes = (
  arrayLength: number,
  indexes: number
): number[] => {
  // If the number of indexes is greater than or equal the length of the array, return all indexes
  if (indexes >= arrayLength)
    return Array.from({ length: arrayLength }, (_, i: number) => i);

  // A set to store unique indexes
  const uniqueIndexes: Set<number> = new Set();

  while (uniqueIndexes.size < indexes) {
    // Generate a random index
    const randomIndex: number =
      crypto.getRandomValues(new Uint32Array(1))[0] % arrayLength;
    // Add the random index to the set, if it is unique
    uniqueIndexes.add(randomIndex);
  }

  // Return the unique indexes as an array
  return Array.from(uniqueIndexes);
};
