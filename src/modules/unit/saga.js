import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {arrayOf} from 'normalizr';
import {receiveUnits, receiveSearchResults, receiveSearchSuggestions, setFetchError} from './actions';
import {UnitActions, unitSchema} from './constants';
import {FetchAction} from '../common/constants';
import {createUrl, createDigitransitUrl, createRequest, callApi, normalizeEntityResults} from '../api/helpers';

function* fetchUnits({payload: {params}}: FetchAction) {
  const request = createRequest(createUrl('unit', params));
  const {response, bodyAsJson} = yield call(callApi, request);

  if(response.status === 200) {
    const data = normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema));
    yield put(receiveUnits(data));
  } else {
    yield put(setFetchError(bodyAsJson.results));
  }
}

function* clearSearch() {
  //yield put(receiveSearchResults([]));
  yield put(receiveSearchSuggestions([]));
}

function* watchFetchUnits() {
  yield takeLatest(UnitActions.FETCH, fetchUnits);
}

function* watchClearSearch() {
  yield takeLatest(UnitActions.SEARCH_CLEAR, clearSearch);
}

export default function* saga() {
  return [
    yield fork(watchFetchUnits),
    yield fork(watchClearSearch)
  ];
}
