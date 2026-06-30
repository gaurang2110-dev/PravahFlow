/**
 * Generates a pseudo-random unique identifier
 * Note: In a production environment with Crypto API available, use crypto.randomUUID()
 * This is a lightweight fallback for cross-platform compatibility
 */
export const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Checks if a string is a valid UUID format
 */
export const isValidIdFormat = (id: string): boolean => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(id);
};
