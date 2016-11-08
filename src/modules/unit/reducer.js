import {keys, values} from 'lodash';
import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {UnitActions, SearchActions, SkatingServices, SkiingServices, UnitFilters} from './constants';
import {EntityAction} from '../common/constants';

const isFetchingReducer = handleActions({
  [UnitActions.FETCH]: () => true,
  [UnitActions.RECEIVE]: () => false
}, false);

const byIdReducer = handleActions({
  [UnitActions.RECEIVE]: (state: Object, {payload: {entities}}: EntityAction) =>
    ({...entities.unit})
}, {});

const all = handleActions({
  [UnitActions.RECEIVE]: (state: Object, {payload: {entities}}: EntityAction) =>
    [...keys(entities.unit)]
}, []);

const skating = handleActions({
  [UnitActions.RECEIVE]: (state: Object, {payload: {entities}}: EntityAction) =>
    [...keys(entities.unit).filter((id) => entities.unit[id].services.some((unitService) => SkatingServices.indexOf(unitService) !== -1))]
}, []);

const skiing = handleActions({
  [UnitActions.RECEIVE]: (state: Object, {payload: {entities}}: EntityAction) =>
    [...keys(entities.unit).filter((id) => entities.unit[id].services.some((unitService) => SkiingServices.indexOf(unitService) !== -1))]
}, []);

// TODO
const openNow = handleActions({
  [UnitActions.RECEIVE]: (state: Object, {payload: {entities}}: EntityAction) =>
    [...keys(entities.unit)]
}, []);

const searchResults = handleActions({
  [SearchActions.RECEIVE_SEARCH_RESULTS]: (state: Object, {payload: {entities}}: EntityAction) =>
    entities ? [...keys(entities.unit)] : []
}, []);

const reducer = combineReducers({
  isFetching: isFetchingReducer,
  byId: byIdReducer,
  all,
  skating,
  skiing,
  openNow,
  searchResults
});

export default reducer;
