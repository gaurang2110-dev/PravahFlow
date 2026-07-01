export interface IOfflineCacheDataSource<T> {
  saveOffline(items: T[]): Promise<void>;
  getOffline(): Promise<T[]>;
  clearOffline(): Promise<void>;
  syncWithRemote(): Promise<void>;
}
