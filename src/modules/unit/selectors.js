import {AppState} from '../common/constants';
import {UnitFilters, DefaultFilters} from './constants';
import {union, intersection} from 'lodash';

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

  return visibleUnits.map((id) => getUnitById(state, {id}));
};

export const getSearchResults = (state: AppState/*, props: Object*/) =>
  state.unit.searchResults.map((id) => getUnitById(state, {id}));
