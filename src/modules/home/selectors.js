
import isEmpty from 'lodash/isEmpty';

export const getIsLoading = (state: AppState) =>
  state.unit.isFetching && isEmpty(state.unit.all) ||
  state.service.isFetching && isEmpty(state.service.all);
