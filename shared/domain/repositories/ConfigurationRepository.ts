import '../interfaces/Repository';
import { AppConfiguration, SystemStatus } from '../models/Configuration';

export interface ConfigurationRepository {
  getAppConfig(): Promise<AppConfiguration>;
  updateAppConfig(config: Partial<AppConfiguration>): Promise<AppConfiguration>;
  getSystemStatus(): Promise<SystemStatus>;
}
