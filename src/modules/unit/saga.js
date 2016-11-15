import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {arrayOf} from 'normalizr';
import {receiveUnits, receiveSearchResults, receiveSearchSuggestions} from './actions';
import {UnitActions, unitSchema} from './constants';
import {FetchAction} from '../common/constants';
import {createUrl, createRequest, callApi, normalizeEntityResults} from '../api/helpers';

function* fetchUnits({payload: {params}}: FetchAction) {
  const request = createRequest(createUrl('unit', params));
  const {bodyAsJson} = yield call(callApi, request);
  const data = normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema));
  yield put(receiveUnits(data));
}

function* search({payload: {params}}: FetchAction) {
  let data = [];
  // Make search request only when there's input
  if (params.input && params.input.length) {
    const request = createRequest(createUrl('search/', params));
    const {bodyAsJson} = yield call(callApi, request);
    data = bodyAsJson.results ? normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema)) : [];
  }
  yield put(receiveSearchResults(data));
}

function* searchSuggestions({payload: {params}}: FetchAction) {
  let data = [];
  // Make search request only when there's input
  if (params.input && params.input.length) {
    const request = createRequest(createUrl('search/', params));
    const {bodyAsJson} = yield call(callApi, request);
    data = bodyAsJson.results ? normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema)) : [];
  }
  yield put(receiveSearchSuggestions(data));
}

function* clearSearch() {
  //yield put(receiveSearchResults([]));
  yield put(receiveSearchSuggestions([]));
}

function* watchFetchUnits() {
  yield takeLatest(UnitActions.FETCH, fetchUnits);
}

function* watchSearchTarget() {
  yield takeLatest(UnitActions.SEARCH_REQUEST, search);
}

function* watchSearchSuggestions() {
  yield takeLatest(UnitActions.FETCH_SEARCH_SUGGESTIONS, searchSuggestions);
}

function* watchClearSearch() {
  yield takeLatest(UnitActions.SEARCH_CLEAR, clearSearch);
}

export default function* saga() {
  return [
    yield fork(watchFetchUnits),
    yield fork(watchSearchTarget),
    yield fork(watchSearchSuggestions),
    yield fork(watchClearSearch)
  ];
}
