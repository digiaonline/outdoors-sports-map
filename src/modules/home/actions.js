import {createAction} from 'redux-actions';
import {homeActions} from './constants';
import {Action} from '../common/constants';

export const setHelloMessage = (message: string): Action =>
  createAction(homeActions.SET_HELLO_MESSAGE)(message);

export const changeLanguage = (language) =>
  createAction(homeActions.CHANGE_LANGUAGE)(language);
