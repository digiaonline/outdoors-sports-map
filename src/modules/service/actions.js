import {createAction} from 'redux-actions';
import {ServiceActions} from './constants';
import {Action} from '../common/constants';
import {ApiResponse} from './constants';

export const fetchServices = (params: Object): Action =>
  createAction(ServiceActions.FETCH)({params});

export const receiveServices = (data: ApiResponse): Action =>
  createAction(ServiceActions.RECEIVE)(data);

export const setFetchError = (error: ApiResponse) =>
  createAction(ServiceActions.FETCH_ERROR)({error});
