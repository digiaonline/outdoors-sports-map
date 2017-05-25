import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {homeActions} from './constants';
import {Action} from '../common/constants';

const helloMessageReducer = handleActions({
  [homeActions.SET_HELLO_MESSAGE]: (state: string, {payload: message}: Action) => message,
}, '');

const reducer = combineReducers({
  helloMessage: helloMessageReducer,
});

export default reducer;