import {createAction} from 'redux-actions';
import values from 'lodash/values';
import {UnitActions} from './constants';
import {Action} from '../common/constants';
import {ApiResponse, UnitServices} from './constants';

export const fetchUnits = (/*params: Object*/): Action =>
  createAction(UnitActions.FETCH)({params: {
    service: `${values(UnitServices).join(',')}`,
    include: 'observations,services',
    page_size: 1000
  }});

export const receiveUnits = (data: ApiResponse): Action =>
  createAction(UnitActions.RECEIVE)(data);

export const searchUnits = (input: string): Action =>
  createAction(UnitActions.SEARCH_REQUEST)({params : {
    input,
    service: `${values(UnitServices).join(',')}`,
    page_size: 5
  }});

export const receiveSearchResults = (results: Array<Object>) =>
  createAction(UnitActions.SEARCH_RECEIVE)(results);
