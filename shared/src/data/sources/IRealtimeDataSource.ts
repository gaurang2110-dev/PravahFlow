export interface IRealtimeDataSource<T> {
  subscribe(callback: (items: T[]) => void): () => void;
  subscribeToId(id: string, callback: (item: T | null) => void): () => void;
  update(id: string, data: Partial<T>): Promise<void>;
}
