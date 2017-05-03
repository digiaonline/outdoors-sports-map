import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {receiveAddress} from './actions';
import {mapActions} from './constants';
import {createUrl, createRequest, callApi} from '../api/helpers';

function* onSetLocation({payload: position}: FetchAction) {
  const addressParams = {
    lat: position[0],
    lon: position[1],
    page_size: 1,
  };
  const addressRequest = createRequest(createUrl('address/', addressParams));
  const {bodyAsJson: addressJson} = yield call(callApi, addressRequest);
  const addressData = addressJson.results ? addressJson.results[0] : null;
  yield put(receiveAddress(addressData));
}

function* watchSetLocation() {
  yield takeLatest(mapActions.SET_LOCATION, onSetLocation);
}

export default function* saga() {
  return [
    yield fork(watchSetLocation),
  ];
}