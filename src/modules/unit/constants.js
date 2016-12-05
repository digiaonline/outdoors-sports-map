import {Schema} from 'normalizr';
import {normalizeActionName} from '../common/helpers';

export const UNIT_PIN_HEIGHT = 40;
export const UNIT_HANDLE_HEIGHT = 32;
export const UNIT_ICON_WIDTH = 32;

export const UnitServices = {
  MECHANICALLY_FROZEN_ICE: 33417,
  ICE_SKATING_FIELD: 33418,
  SPEED_SKATING_TRACK: 33420,
  SKI_TRACK: 33483,
  DOG_SKI_TRACK: 33492
};

export const IceSkatingServices = [
  UnitServices.MECHANICALLY_FROZEN_ICE,
  UnitServices.ICE_SKATING_FIELD,
  UnitServices.SPEED_SKATING_TRACK
];

export const SkiingServices = [
  UnitServices.SKI_TRACK,
  UnitServices.DOG_SKI_TRACK
];

export const SwimmingServices = [];

export const UnitFilters = {
  SKIING: 'ski',
  ICE_SKATING: 'iceskate',
  //SWIMMING: 'swim',
  STATUS_OK: 'status_ok',
  STATUS_ALL: 'status_all'
};

export const StatusFilters = [
  UnitFilters.STATUS_OK,
  UnitFilters.STATUS_ALL
];

export const SportFilters = [
  UnitFilters.SKIING,
  UnitFilters.ICE_SKATING
  //UnitFilters.SWIMMING
];

export const SortKeys = {
  ALPHABETICAL: 'alphabetical',
  DISTANCE: 'distance',
  CONDITION: 'condition'
};

export const UNIT_BATCH_SIZE = 20;

export const DefaultFilters = {
  sport: UnitFilters.SKIING,
  status: UnitFilters.STATUS_OK
};

export const UnitQuality = {
  GOOD: 'good',
  SATISFACTORY: 'satisfactory',
  UNUSABLE: 'unusable',
  UNKNOWN: 'unknown'
};

export const QualityEnum = {
  [UnitQuality.GOOD]: 1,
  [UnitQuality.SATISFACTORY]: 2,
  [UnitQuality.UNUSABLE]: 3,
  [UnitQuality.UNKNOWN]: 4
};

export const UnitActions = {
  FETCH: normalizeActionName('unit/FETCH'),
  RECEIVE: normalizeActionName('unit/RECEIVE'),
  FETCH_ERROR: normalizeActionName('unit/FETCH_ERROR'),
  SEARCH_CLEAR: normalizeActionName('unit/SEARCH_CLEAR'),
  SEARCH_REQUEST: normalizeActionName('unit/SEARCH_REQUEST'),
  SEARCH_RECEIVE: normalizeActionName('unit/SEARCH_RECEIVE'),
  FETCH_SEARCH_SUGGESTIONS: normalizeActionName('unit/FETCH_SEARCH_SUGGESTIONS'),
  RECEIVE_SEARCH_SUGGESTIONS: normalizeActionName('unit/RECEIVE_SEARCH_SUGGESTIONS')
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

export const unitSchema = new Schema('unit'/*, {}*/);
