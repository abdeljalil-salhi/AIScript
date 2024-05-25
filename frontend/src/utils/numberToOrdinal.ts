/**
 * Converts a number to its ordinal form.
 *
 * @param {number} num - The number to convert.
 * @returns {string} The ordinal form of the number.
 * @example
 * numberToOrdinal(1); // first
 * numberToOrdinal(2); // second
 * numberToOrdinal(3); // third
 * numberToOrdinal(21); // twenty-first
 * numberToOrdinal(42); // forty-second
 * numberToOrdinal(101); // 100th
 * numberToOrdinal(111); // 111th
 * numberToOrdinal(121); // 121st
 */
export const numberToOrdinal = (num: number): string => {
  const ordinals: { [key: number]: string } = {
    0: "zeroth",
    1: "first",
    2: "second",
    3: "third",
    4: "fourth",
    5: "fifth",
    6: "sixth",
    7: "seventh",
    8: "eighth",
    9: "ninth",
    10: "tenth",
    11: "eleventh",
    12: "twelfth",
    13: "thirteenth",
    14: "fourteenth",
    15: "fifteenth",
    16: "sixteenth",
    17: "seventeenth",
    18: "eighteenth",
    19: "nineteenth",
    20: "twentieth",
    30: "thirtieth",
    40: "fortieth",
    50: "fiftieth",
    60: "sixtieth",
    70: "seventieth",
    80: "eightieth",
    90: "ninetieth",
  };

  if (ordinals[num]) return ordinals[num];

  const tensPlace: number = Math.floor(num / 10);
  const unitsPlace: number = num % 10;

  if (num <= 99) return `${numberToWord(tensPlace)}y-${units[unitsPlace]}`;

  return `${num}${getOrdinalSuffix(num)}`;
};

const numberToWord = (num: number): string => {
  const words: { [key: number]: string } = {
    2: "twent",
    3: "thirt",
    4: "fort",
    5: "fift",
    6: "sixt",
    7: "sevent",
    8: "eight",
    9: "ninet",
  };

  return words[num];
};

const getOrdinalSuffix = (num: number): string => {
  const lastDigit: number = num % 10;
  const lastTwoDigits: number = num % 100;

  if (lastTwoDigits > 10 && lastTwoDigits < 20) return "th";

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const units: { [key: number]: string } = {
  1: "first",
  2: "second",
  3: "third",
  4: "fourth",
  5: "fifth",
  6: "sixth",
  7: "seventh",
  8: "eighth",
  9: "ninth",
};
