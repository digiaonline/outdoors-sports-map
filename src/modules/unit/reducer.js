import keys from 'lodash/keys';
import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {UnitActions} from './constants';
import {EntityAction} from '../common/constants';

const isFetchingReducer = handleActions({
  [UnitActions.FETCH]: () => true,
  [UnitActions.RECEIVE]: () => false
}, false);

const byIdReducer = handleActions({
  [UnitActions.RECEIVE]: (state: Object, {payload: {entities}}: EntityAction) =>
    ({...state, ...entities.unit})
}, {});

const idsReducer = handleActions({
  [UnitActions.RECEIVE]: (state: Object, {payload: {entities}}: EntityAction) =>
    [...state, ...keys(entities.unit).filter((id) => state.indexOf(id) === -1)]
}, []);

const reducer = combineReducers({
  isFetching: isFetchingReducer,
  byId: byIdReducer,
  ids: idsReducer
});

export default reducer;