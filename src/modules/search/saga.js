import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {arrayOf} from 'normalizr';
import {receiveUnits, receiveUnitSuggestions, receiveAddressSuggestions} from './actions';
import {SearchActions} from './constants';
import {unitSchema} from '../unit/constants';
import {FetchAction} from '../common/constants';
import {createUrl, createDigitransitUrl, createRequest, callApi, normalizeEntityResults} from '../api/helpers';

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
  let addressData = [];
  const digitransitParams = {
    text: params.input,
    'boundary.rect.min_lat': 59.9,
    'boundary.rect.max_lat': 60.45,
    'boundary.rect.min_lon': 24.3,
    'boundary.rect.max_lon': 25.5,
    'focus.point.lat': 60.17,
    'focus.point.lon': 24.94,
    size: 5,
    lang: 'fi',
  };
  // Make search request only when there's input
  if (params.input && params.input.length) {
    const request = createRequest(createUrl('search/', params));
    const addressRequest = createRequest(createDigitransitUrl('search', digitransitParams));
    const {bodyAsJson} = yield call(callApi, request);
    const {bodyAsJson: addressBodyAsJson} = yield call(callApi, addressRequest);
    addressData = addressBodyAsJson ? addressBodyAsJson.features.filter((feature) => feature.properties.layer !== 'stop') : [];
    data = bodyAsJson.results ? normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema)) : [];
  }
  yield put(receiveUnitSuggestions(data));
  yield put(receiveAddressSuggestions(addressData));
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
    yield fork(watchClearSearch),
  ];
}