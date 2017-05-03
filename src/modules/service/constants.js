import {Schema} from 'normalizr';
import {normalizeActionName} from '../common/helpers';

export const UnitServices = {
  MECHANICALLY_FROZEN_ICE: 33417,
  ICE_SKATING_FIELD: 33418,
  ICE_RINK: 33419,
  SPEED_SKATING_TRACK: 33420,
  ICE_SKATING_ROUTE: 33421,
  SKI_TRACK: 33483,
  DOG_SKI_TRACK: 33492,
  SWIMMING_BEACH: 33467,
  SWIMMING_PLACE: 33468,
};

export const IceSkatingServices = [
  UnitServices.MECHANICALLY_FROZEN_ICE,
  UnitServices.ICE_SKATING_FIELD,
  UnitServices.ICE_RINK,
  UnitServices.SPEED_SKATING_TRACK,
  UnitServices.ICE_SKATING_ROUTE,
];

export const SkiingServices = [
  UnitServices.SKI_TRACK,
  UnitServices.DOG_SKI_TRACK,
];

export const SwimmingServices = [
  UnitServices.SWIMMING_BEACH,
  UnitServices.SWIMMING_PLACE,
];

export const ServiceActions = {
  FETCH: normalizeActionName('service/FETCH'),
  RECEIVE: normalizeActionName('service/RECEIVE'),
  FETCH_ERROR: normalizeActionName('service/FETCH_ERROR'),
};

export type UnitState = {
  isFetching: boolean,
  byId: Object,
  // Filtered arrays of ids
  all: Array<string>,
  skating: Array<string>,
  skiing: Array<string>,
  searchResults: Array<string>
};

export const serviceSchema = new Schema('service'/*, {}*/);
