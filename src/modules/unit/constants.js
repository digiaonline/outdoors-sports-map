import {Schema} from 'normalizr';
import {normalizeActionName} from '../common/helpers';

export const UnitServices = {
  MECHANICALLY_FROZEN_ICE: 33417,
  ICE_SKATING_FIELD: 33418
};

export const SkatingServices = [
  UnitServices.MECHANICALLY_FROZEN_ICE,
  UnitServices.ICE_SKATING_FIELD
];

export const SkiingServices = [];

export const UnitFilters = {
  SKATING: 'skating',
  SKIING: 'skiing',
  OPEN_NOW: 'open_now'
};

export const DefaultFilters = [
  UnitFilters.SKATING,
  UnitFilters.SKIING
];

export const UnitActions = {
  FETCH: normalizeActionName('unit/FETCH'),
  RECEIVE: normalizeActionName('unit/RECEIVE'),
  SET_FILTERS: normalizeActionName('unit/SET_FILTERS')
};

export const SearchActions = {
  SEARCH: 'search/SEARCH',
  RECEIVE_SEARCH_RESULTS: 'search/RECEIVE_SEARCH_RESULTS'
};

export type UnitState = {
  isFetching: boolean,
  byId: Object,
  // Filtered arrays of ids
  all: Array,
  skating: Array,
  skiing: Array,
  // Array of filter active filter names
  filters: Array
};

export const unitSchema = new Schema('unit'/*, {}*/);
