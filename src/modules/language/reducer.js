import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {languageActions} from './constants';

const languageReducer = handleActions({
  [languageActions.CHANGE_LANGUAGE]: (state, {payload: language}) => language
}, 'en');

export default languageReducer;
