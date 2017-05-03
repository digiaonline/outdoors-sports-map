import {AppState} from '../common/constants';
import {UnitFilters, DefaultFilters, QualityEnum} from './constants';
import {enumerableQuality, getUnitQuality} from './helpers';
import {intersection, isEmpty, memoize} from 'lodash';
import {getIsActive as getSearchActive, getUnitResultIDs} from '../search/selectors';

export const getUnitById = (state: AppState, props: Object) =>
  state.unit.byId[props.id];

export const getAllUnits = (state: AppState/*, props: Object*/) =>
  state.unit.all.map((id) => getUnitById(state, {id}));

const _getVisibleUnits = (state: AppState, query: Object) => {
  const sport = query && query.sport || DefaultFilters.sport;
  const status = query && query.status || DefaultFilters.status;

  let visibleUnits = state.unit[sport];

  if (status === UnitFilters.STATUS_OK) {
    visibleUnits = intersection(visibleUnits, state.unit[UnitFilters.STATUS_OK]);
  }

  if(getSearchActive(state)) {
    visibleUnits = intersection(visibleUnits, getUnitResultIDs(state));
  }

  return visibleUnits.map((id) => getUnitById(state, {id}));
};

export const getVisibleUnits = memoize(_getVisibleUnits, (state: AppState, query: Array<string>) => (
  `${JSON.stringify(state.unit)}${getSearchActive(state)}${JSON.stringify(getUnitResultIDs(state))}${JSON.stringify(query)}`
));

export const getSearchResults = (state: AppState/*, props: Object*/) =>
  state.unit.searchResults.map((id) => getUnitById(state, {id}));

export const getSearchSuggestions = (state: AppState): Array<Object> =>
  state.unit.searchSuggestions.map((id) => getUnitById(state, {id}));

export const getIsFetchingUnits = (state: AppState) =>
  state.unit.isFetching;

export const getIsLoading = (state: AppState) =>
  state.unit.isFetching && isEmpty(state.unit.all);