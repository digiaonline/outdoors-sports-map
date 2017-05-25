import {keys} from 'lodash';
import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {SearchActions} from './constants';
import {EntityAction} from '../common/constants';

const isFetching = handleActions({
  [SearchActions.FETCH_UNITS]: () => true,
  [SearchActions.RECEIVE_UNITS]: () => false,
}, false);

const isActive = handleActions({
  [SearchActions.RECEIVE_UNITS]: () => true,
  [SearchActions.CLEAR]: () => false,
}, false);

const unitResults = handleActions({
  [SearchActions.RECEIVE_UNITS]: (state: Object, {payload: {entities}}: EntityAction) =>
    entities ? [...keys(entities.unit)] : [],
  [SearchActions.CLEAR]: () => [],
}, []);

const unitSuggestions = handleActions({
  [SearchActions.RECEIVE_UNIT_SUGGESTIONS]: (state: Object, {payload: {entities}}: EntityAction) =>
    entities ? [...keys(entities.unit)] : [],
  [SearchActions.RECEIVE_UNITS]: () => [],
  [SearchActions.CLEAR]: () => [],
}, []);

const addressSuggestions = handleActions({
  [SearchActions.RECEIVE_ADDRESS_SUGGESTIONS]: (state: Object, {payload: results}: EntityAction) =>
    results ? results : [],
  [SearchActions.CLEAR]: () => [],
}, []);

const reducer = combineReducers({
  isFetching,
  isActive,
  unitResults,
  unitSuggestions,
  addressSuggestions,
});

export default reducer;