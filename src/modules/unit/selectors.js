import {AppState} from '../common/constants';
import {UnitFilters, DefaultFilters} from './constants';
import {union, intersection, isEmpty} from 'lodash';
import {getIsActive as getSearchActive, getUnitResultIDs} from '../search/selectors';

export const getUnitById = (state: AppState, props: Object) =>
  state.unit.byId[props.id];

export const getAllUnits = (state: AppState/*, props: Object*/) =>
  state.unit.all.map((id) => getUnitById(state, {id}));

export const getVisibleUnits = (state: AppState, filters = DefaultFilters) => {
  let visibleUnits = [];

  filters.forEach((filter) => {
    if(filter === UnitFilters.NOW_OPEN) {
      return;
    }
    visibleUnits = union(visibleUnits, state.unit[filter]);
  });

  if (filters.includes(UnitFilters.NOW_OPEN)) {
    visibleUnits = intersection(visibleUnits, state.unit[UnitFilters.NOW_OPEN]);
  }

  if(getSearchActive(state)) {
    visibleUnits = intersection(visibleUnits, getUnitResultIDs(state));
  }

  return visibleUnits.map((id) => getUnitById(state, {id}));
};

export const getSearchResults = (state: AppState/*, props: Object*/) =>
  state.unit.searchResults.map((id) => getUnitById(state, {id}));

export const getSearchSuggestions = (state: AppState): Array<Object> =>
  state.unit.searchSuggestions.map((id) => getUnitById(state, {id}));

export const getIsFetchingUnits = (state: AppState) =>
  state.unit.isFetching;

export const getIsLoading = (state: AppState) =>
  state.unit.isFetching && isEmpty(state.unit.all);
