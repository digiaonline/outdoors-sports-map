import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {mapActions} from './constants';
import {Action} from '../common/constants';

const centerReducer = handleActions({
  [mapActions.UPDATE_CENTER]: (state: Array, {payload: center}: Action) =>
    center
}, []);

const reducer = combineReducers({
  center: centerReducer
});

export default reducer;
