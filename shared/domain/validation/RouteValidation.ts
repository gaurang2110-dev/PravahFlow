import { Route } from '../models/Route';
import { isValidCoordinate } from './LocationValidation';

export const isValidRoute = (route: Partial<Route>): boolean => {
  if (!route) return false;

  if (!route.name || typeof route.name !== 'string' || route.name.trim() === '') {
    return false;
  }

  if (!route.waypoints || !Array.isArray(route.waypoints) || route.waypoints.length < 2) {
    return false;
  }

  return route.waypoints.every(wp =>
    wp && typeof wp.order === 'number' && isValidCoordinate(wp.coordinate)
  );
};
