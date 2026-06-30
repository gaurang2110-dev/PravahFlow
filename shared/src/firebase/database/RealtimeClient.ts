/**
 * Subscription handle representing an active real-time connection.
 */
export interface Subscription {
  /**
   * Closes the active real-time connection and releases resources.
   */
  unsubscribe(): void;
}

/**
 * Options for subscribing to real-time events.
 */
export interface SubscriptionOptions {
  limit?: number;
  orderBy?: string;
  startAt?: string | number;
  endAt?: string | number;
}

/**
 * Interface representing the real-time database capabilities.
 * Prepared for future implementation.
 */
export interface IRealtimeClient {
  /**
   * Subscribes to changes at a specific path.
   *
   * @param path The database path to subscribe to.
   * @param onData Callback fired when data changes.
   * @param onError Callback fired when an error occurs.
   * @param options Additional subscription options.
   * @returns A subscription handle that can be used to unsubscribe.
   */
  subscribe<T>(
    path: string,
    onData: (data: T | null) => void,
    onError?: (error: Error) => void,
    options?: SubscriptionOptions
  ): Subscription;

  /**
   * Unsubscribes from all listeners at a specific path.
   *
   * @param path The database path to unsubscribe from.
   */
  unsubscribe(path: string): void;

  /**
   * Observes a collection of documents/nodes at a specific path.
   *
   * @param path The path representing the collection.
   * @param onData Callback fired when the collection changes.
   * @param options Additional query options.
   * @returns A subscription handle.
   */
  observeCollection<T>(
    path: string,
    onData: (data: T[]) => void,
    options?: SubscriptionOptions
  ): Subscription;

  /**
   * Observes a single document/node at a specific path.
   *
   * @param path The path representing the document.
   * @param onData Callback fired when the document changes.
   * @returns A subscription handle.
   */
  observeDocument<T>(
    path: string,
    onData: (data: T | null) => void
  ): Subscription;
}
