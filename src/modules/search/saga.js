import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {arrayOf} from 'normalizr';
import {receiveUnits, receiveUnitSuggestions} from './actions';
import {SearchActions} from './constants';
import {unitSchema} from '../unit/constants';
import {FetchAction} from '../common/constants';
import {createUrl, createRequest, callApi, normalizeEntityResults} from '../api/helpers';

function* searchUnits({payload: {params}}: FetchAction) {
  let data = [];
  // Make search request only when there's input
  if (params.input && params.input.length) {
    const request = createRequest(createUrl('search/', params));
    const {bodyAsJson} = yield call(callApi, request);
    data = bodyAsJson.results ? normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema)) : [];
  }
  yield put(receiveUnits(data));
}

function* fetchUnitSuggestions({payload: {params}}: FetchAction) {
  let data = [];
  // Make search request only when there's input
  if (params.input && params.input.length) {
    const request = createRequest(createUrl('search/', params));
    const {bodyAsJson} = yield call(callApi, request);
    data = bodyAsJson.results ? normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema)) : [];
  }
  yield put(receiveUnitSuggestions(data));
}

function* clearSearch() {
  //yield put(receiveSearchResults([]));
  yield put(receiveUnitSuggestions([]));
}

function* watchSearchUnits() {
  yield takeLatest(SearchActions.FETCH_UNITS, searchUnits);
}

function* watchFetchUnitSuggestions() {
  yield takeLatest(SearchActions.FETCH_UNIT_SUGGESTIONS, fetchUnitSuggestions);
}

function* watchClearSearch() {
  yield takeLatest(SearchActions.CLEAR, clearSearch);
}

export default function* saga() {
  return [
    yield fork(watchSearchUnits),
    yield fork(watchFetchUnitSuggestions),
    yield fork(watchClearSearch)
  ];
}
