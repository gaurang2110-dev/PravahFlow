export interface AnalyticsSummary {
  totalVehicles: number;
  activeVehicles: number;
  totalDistanceCovered: number; // In meters
  totalAlerts: number;
  periodStart: number;
  periodEnd: number;
}
