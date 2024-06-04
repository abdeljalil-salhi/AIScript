/**
 * Deletes a cookie by setting its expiration date to a date in the past.
 *
 * @param {string} name - Cookie name
 * @returns {void}
 */
export const deleteCookie = (name: string): void => {
  // Set the expiration date of the cookie to a date in the past
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
