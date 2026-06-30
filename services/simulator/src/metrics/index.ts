export interface Metrics {
  activeVehicles: number;
  tickDurationMs: number;
  memoryUsageBytes: number;
  cpuUsagePercent: number;
  eventsPerSecond: number;
  simulationThroughput: number;
}

export interface MetricsCollector {
  recordActiveVehicles(count: number): void;
  recordTickDuration(durationMs: number): void;
  recordMemoryUsage(bytes: number): void;
  recordCpuUsage(percent: number): void;
  recordEvent(): void;
  recordThroughput(itemsProcessed: number): void;

  getSnapshot(): Metrics;
  reset(): void;
}
