/**
 * Get a cookie by its name.
 *
 * @param {string} name - Cookie name
 * @returns {string | null | undefined} - Cookie value or null if not found
 */
export const getCookie = (name: string): string | null | undefined => {
  // Get the cookie value
  const value: string = `; ${document.cookie}`;

  // Split the cookie value by the cookie name
  const parts: string[] = value.split(`; ${name}=`);

  // Return the cookie value
  return parts.length === 2 ? parts.pop()!.split(";").shift() : null;
};
