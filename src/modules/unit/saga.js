import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {arrayOf} from 'normalizr';
import {receiveUnits, receiveSearchResults} from './actions';
import {UnitActions, unitSchema} from './constants';
import {FetchAction} from '../common/constants';
import {createUrl, createRequest, callApi, normalizeEntityResults} from '../api/helpers';

function* fetchUnits({payload: {params}}: FetchAction) {
  const request = createRequest(createUrl('unit', params));
  const {bodyAsJson} = yield call(callApi, request);
  const data = normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema));
  yield put(receiveUnits(data));
}

function* search({payload: {params}}) {
  let data = [];
  // Make search request only when there's input
  if (params.input && params.input.length) {
    const request = createRequest(createUrl('search/', params));
    const {bodyAsJson} = yield call(callApi, request);
    data = bodyAsJson.results ? normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema)) : [];
  }
  yield put(receiveSearchResults(data));
}

function* watchFetchUnits() {
  yield takeLatest(UnitActions.FETCH, fetchUnits);
}

function* watchSearchTarget() {
  yield takeLatest(UnitActions.SEARCH_REQUEST, search);
}

export default function* saga() {
  return [
    yield fork(watchFetchUnits),
    yield fork(watchSearchTarget)
  ];
}
