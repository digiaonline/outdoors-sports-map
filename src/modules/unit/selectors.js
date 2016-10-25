import {AppState} from '../common/constants';

export const getUnitById = (state: AppState, props: Object) =>
  state.unit.byId[props.id];

export const getAllUnits = (state: AppState/*, props: Object*/) =>
  state.unit.ids.map((id) => getUnitById(state, {id}));