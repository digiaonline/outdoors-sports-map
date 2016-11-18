import {createAction} from 'redux-actions';
import values from 'lodash/values';
import {UnitActions} from './constants';
import {Action} from '../common/constants';
import {ApiResponse, UnitServices} from './constants';

export const fetchUnits = (/*params: Object*/): Action =>
  createAction(UnitActions.FETCH)({params: {
    service: `${values(UnitServices).join(',')}`,
    only: 'id,name,location,street_address,address_zip',
    include: 'observations,services',
    geometry: 'true',
    page_size: 1000
  }});

export const receiveUnits = (data: ApiResponse): Action =>
  createAction(UnitActions.RECEIVE)(data);

export const clearSearch = () =>
  createAction(UnitActions.SEARCH_CLEAR)();

export const searchUnits = (input: string, params: Object): Action => {
  const init = {
    input,
    service: `${values(UnitServices).join(',')}`
  };

  params = Object.assign({}, init, params);
  return createAction(UnitActions.SEARCH_REQUEST)({params});
};

export const fetchSearchSuggestions = (input: string): Action =>
  createAction(UnitActions.FETCH_SEARCH_SUGGESTIONS)({params: {
    input,
    service: `${values(UnitServices).join(',')}`,
    page_size: 5
  }});

export const receiveSearchResults = (results: Array<Object>) =>
  createAction(UnitActions.SEARCH_RECEIVE)(results);

export const receiveSearchSuggestions = (results: Array<Object>) =>
  createAction(UnitActions.RECEIVE_SEARCH_SUGGESTIONS)(results);
