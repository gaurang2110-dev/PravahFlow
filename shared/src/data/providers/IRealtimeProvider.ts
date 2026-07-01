export interface IRealtimeProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  subscribeToTopic<T>(topic: string, callback: (data: T) => void): () => void;
  publishToTopic<T>(topic: string, data: T): Promise<void>;
}
