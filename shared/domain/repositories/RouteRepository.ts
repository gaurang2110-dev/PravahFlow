import { Repository } from '../interfaces/Repository';
import { Route } from '../models/Route';

export interface RouteRepository extends Repository<Route> {
  getRoutesByRegion(regionId: string): Promise<Route[]>;
  calculateDistance(routeId: string): Promise<number>;
}
