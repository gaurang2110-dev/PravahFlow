export interface TickEngine {
  start(): void;
  stop(): void;
  onTick(handler: (tickTimeMs: number) => void | Promise<void>): void;
}

export interface BatchProcessor<T> {
  add(item: T): void;
  processBatch(batch: T[]): Promise<void>;
  flush(): Promise<void>;
}

export interface WorkerScheduler {
  scheduleTask(taskDef: { name: string; payload: unknown; priority: number }): Promise<string>;
  cancelTask(taskId: string): Promise<void>;
}

export interface DynamicRateManager {
  setTargetRate(rateHz: number): void;
  getCurrentRate(): number;
  adjustRate(loadFactor: number): void;
}
