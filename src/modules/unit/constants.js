import {Schema} from 'normalizr';
import {normalizeActionName} from '../common/helpers';

export const UnitServices = {
  MECHANICALLY_FROZEN_ICE: 33417,
  ICE_SKATING_FIELD: 33418
}

export const UnitActions = {
  FETCH: normalizeActionName('unit/FETCH'),
  RECEIVE: normalizeActionName('unit/RECEIVE')
};

export type UnitState = {
  isFetching: boolean,
  byId: Object,
  ids: Array
};

export const unitSchema = new Schema('unit'/*, {}*/);