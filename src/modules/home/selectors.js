
import isEmpty from 'lodash/isEmpty';

export const getIsLoading = (state: AppState) =>
  state.unit.isFetching && state.service.isFetching
  && isEmpty(state.unit) && isEmpty(state.service);
