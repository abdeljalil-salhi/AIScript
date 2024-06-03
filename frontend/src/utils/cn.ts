// Dependencies
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge Tailwind CSS classes with clsx.
 *
 * @param {...ClassValue[]} inputs - The Tailwind CSS classes to merge.
 * @returns {string} - The merged Tailwind CSS classes.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
