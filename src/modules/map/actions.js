import {createAction} from 'redux-actions';
import {mapActions} from './constants';
import {Action} from '../common/constants';

export const setLocation = (position: Array): Action =>
  createAction(mapActions.SET_LOCATION)(position);

export const receiveAddress = (address: Object): Action =>
  createAction(mapActions.RECEIVE_ADDRESS)(address);