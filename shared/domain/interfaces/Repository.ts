export interface Repository<T> {
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface RealtimeRepository<T> extends Repository<T> {
  subscribe(callback: (items: T[]) => void): () => void;
  subscribeToId(id: string, callback: (item: T | null) => void): () => void;
}
