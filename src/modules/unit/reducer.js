import {keys, values} from 'lodash';
import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {UnitActions, SearchActions, IceSkatingServices, SkiingServices, UnitFilters} from './constants';
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

const iceskate = handleActions({
  [UnitActions.RECEIVE]: (state: Object, {payload: {entities}}: EntityAction) =>
    [...keys(entities.unit).filter((id) => entities.unit[id].services.some((unitService) => IceSkatingServices.indexOf(unitService.id) !== -1))]
}, []);

const ski = handleActions({
  [UnitActions.RECEIVE]: (state: Object, {payload: {entities}}: EntityAction) =>
    [...keys(entities.unit).filter((id) => entities.unit[id].services.some((unitService) => SkiingServices.indexOf(unitService.id) !== -1))]
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
  iceskate,
  ski,
  openNow,
  searchResults
});

export default reducer;
