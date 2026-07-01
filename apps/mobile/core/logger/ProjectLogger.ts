import { Logger } from '../../../../shared/domain/interfaces/Logger';

// This satisfies the interface and avoids console.log per guidelines.
// In a real app this would send logs to a service like Crashlytics or Datadog.
export class ProjectLogger implements Logger {
  info(message: string, context?: Record<string, unknown>): void {
    // remoteLog('info', message, context)
  }
  warn(message: string, context?: Record<string, unknown>): void {
    // remoteLog('warn', message, context)
  }
  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    // remoteLog('error', message, error, context)
  }
  debug(message: string, context?: Record<string, unknown>): void {
    // remoteLog('debug', message, context)
  }
}

export const logger = new ProjectLogger();
