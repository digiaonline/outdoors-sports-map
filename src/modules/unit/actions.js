import {createAction} from 'redux-actions';
import values from 'lodash/values';
import {UnitActions} from './constants';
import {Action} from '../common/constants';
import {ApiResponse, UnitServices} from './constants';

export const fetchUnits = (/*params: Object*/): Action =>
  createAction(UnitActions.FETCH)({params: {
    service: `${values(UnitServices).join(',')}`,
    page_size: 1000
  }});

export const receiveUnits = (data: ApiResponse): Action =>
  createAction(UnitActions.RECEIVE)(data);