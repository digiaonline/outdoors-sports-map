import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {mapActions} from './constants';
import {Action} from '../common/constants';

const centerReducer = handleActions({
  [mapActions.SET_LOCATION]: (state: Array, {payload: position}: Action) =>
    position
}, []);

const reducer = combineReducers({
  location: centerReducer
});

export default reducer;
