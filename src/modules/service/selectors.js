// @flow
import type {AppState} from '../common/constants';
import {isEmpty} from 'lodash';

export const getServiceById = (state: AppState, serviceId: string) =>
  state.service.byId[serviceId];

export const getAll = (state: AppState/*, props: Object*/) =>
  state.service.all.map((serviceId) => getServiceById(state, serviceId));

export const getServicesObject = (state: AppState) =>
  state.service.byId;

export const getIsFetchingService = (state: AppState) =>
  state.service.isFetching;

export const getIsLoading = (state: AppState) =>
  state.service.isFetching && isEmpty(state.service.all);