import { AnalyticsSummary } from '../models/Analytics';

export interface AnalyticsRepository {
  getSummary(startDate: number, endDate: number): Promise<AnalyticsSummary>;
  getVehicleMetrics(vehicleId: string, startDate: number, endDate: number): Promise<Record<string, number>>;
}
