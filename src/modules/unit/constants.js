import {Schema} from 'normalizr';
import {normalizeActionName} from '../common/helpers';

export const UnitServices = {
  MECHANICALLY_FROZEN_ICE: 33417,
  ICE_SKATING_FIELD: 33418
};

export const IceSkatingServices = [
  UnitServices.MECHANICALLY_FROZEN_ICE,
  UnitServices.ICE_SKATING_FIELD
];

export const SkiingServices = [];

export const SwimmingServices = [];

export const UnitFilters = {
  SKATING: 'iceskate',
  SKIING: 'ski',
  OPEN_NOW: 'open_now'
};

export const SortKeys = {
  ALPHABETICAL: 'alphabetical',
  DISTANCE: 'distance',
  CONDITION: 'condition'
};

export const DefaultFilters = [
  UnitFilters.SKATING,
  UnitFilters.SKIING
];

export const QualityEnum = {
  'good': 1,
  'satisfactory': 2,
  'unusable': 3
};

export const UnitActions = {
  FETCH: normalizeActionName('unit/FETCH'),
  RECEIVE: normalizeActionName('unit/RECEIVE'),
  SEARCH_REQUEST: normalizeActionName('unit/SEARCH_REQUEST'),
  SEARCH_RECEIVE: normalizeActionName('unit/SEARCH_RECEIVE')
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
