export type Environment = 'development' | 'staging' | 'production';

export interface LoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
}

export interface EngineConfig {
  tickRateMs: number;
  maxVehicles: number;
}

export interface AppConfig {
  environment: Environment;
  logging: LoggingConfig;
  engine: EngineConfig;
  // Note: No secrets should be stored in here
}

export interface ConfigurationManager {
  loadConfig(): Promise<AppConfig>;
  getConfig(): AppConfig;
  updateConfig(newConfig: Partial<AppConfig>): Promise<void>;
}
