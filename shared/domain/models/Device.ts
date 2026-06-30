import { TimestampedEntity } from '../interfaces/TimestampedEntity';
import { DeviceStatus, ConnectionStatus } from '../enums';

export interface Device extends TimestampedEntity {
  serialNumber: string;
  imei?: string;
  simNumber?: string;
  model: string;
  firmwareVersion: string;
  status: DeviceStatus;
  connectionStatus: ConnectionStatus;
  lastConnectedAt?: number;
}
