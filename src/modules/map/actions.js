import {createAction} from 'redux-actions';
import {mapActions} from './constants';
import {Action} from '../common/constants';

export const updateMapCenter = (center: Array): Action =>
  createAction(mapActions.UPDATE_CENTER)(center);
