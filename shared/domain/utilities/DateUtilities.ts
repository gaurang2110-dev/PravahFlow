/**
 * Gets the current timestamp in milliseconds
 */
export const getCurrentTimestamp = (): number => {
  return Date.now();
};

/**
 * Checks if a timestamp is valid (not NaN, positive, not in far future)
 */
export const isValidTimestamp = (timestamp: number): boolean => {
  if (typeof timestamp !== 'number' || isNaN(timestamp) || timestamp < 0) {
    return false;
  }

  // Basic sanity check - not more than 10 years in the future
  const maxValidFuture = Date.now() + (10 * 365 * 24 * 60 * 60 * 1000);
  return timestamp <= maxValidFuture;
};

/**
 * Formats duration in milliseconds to a readable string (HH:MM:SS)
 */
export const formatDuration = (durationMs: number): string => {
  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
};
