import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {homeActions} from './constants';
import {Action} from '../common/constants';


const languageReducer = handleActions({
  [homeActions.CHANGE_LANGUAGE]: (state, {payload: language}) => language
}, 'EN');

const helloMessageReducer = handleActions({
  [homeActions.SET_HELLO_MESSAGE]: (state: string, {payload: message}: Action) => message
}, '');

const reducer = combineReducers({
  helloMessage: helloMessageReducer,
  language: languageReducer
});

export default reducer;