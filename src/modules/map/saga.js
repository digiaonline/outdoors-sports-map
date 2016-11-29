import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {receiveAddress} from './actions';
import {mapActions} from './constants';
import {createUrl, createRequest, callApi, normalizeEntityResults} from '../api/helpers';

function* fetchAddress({payload: position}: FetchAction) {
  // Make search request only when there's input
  const params = {
    lat: position[0],
    lon: position[1],
    page_size: 1
  };
  const request = createRequest(createUrl('address/', params));
  const {bodyAsJson} = yield call(callApi, request);
  const  data = bodyAsJson.results ? bodyAsJson.results[0] : null;

  yield put(receiveAddress(data));
}

function* watchSetLocation() {
  yield takeLatest(mapActions.SET_LOCATION, fetchAddress);
}

export default function* saga() {
  return [
    yield fork(watchSetLocation)
  ];
}