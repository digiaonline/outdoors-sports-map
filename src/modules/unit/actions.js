import {createAction} from 'redux-actions';
import {UnitActions} from './constants';
import {Action} from '../common/constants';
import {ApiResponse} from './constants';

export const fetchUnits = (params: Object): Action =>
  createAction(UnitActions.FETCH)({params});

export const receiveUnits = (data: ApiResponse): Action =>
  createAction(UnitActions.RECEIVE)(data);