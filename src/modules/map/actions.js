import {createAction} from 'redux-actions';
import {mapActions} from './constants';
import {Action} from '../common/constants';

export const setLocation = (position: Array): Action =>
  createAction(mapActions.SET_LOCATION)(position);
