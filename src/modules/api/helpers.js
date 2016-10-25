import {call} from 'redux-saga/effects';
import {normalize} from 'normalizr';
import {API_URL} from '../common/constants';
import {ApiResponse} from './constants';

export const normalizeEntityResults = (results: Object, schema: Schema): Object =>
  normalize(results, schema);

export function* callApi(request: Request): ApiResponse {
  const response = yield call(fetch, request);
  const bodyAsJson = yield call([response, response.json]);
  return {response, bodyAsJson};
}

export const createRequest = (url: string, init: Object): Request =>
  new Request(url, init);

export const createUrl = (url: string, params: Object): string =>
  `${API_URL}/${url}${params ? `?${stringifyQuery(params)}` : ''}`;

const stringifyQuery = (query: Object): string =>
  Object
    .keys(query)
    .map((key) => [key, query[key]].map((v) => encodeURIComponent(v)).join('='))
    .join('&');