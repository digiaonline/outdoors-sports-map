import {takeLatest} from 'redux-saga';
import {call, fork, put} from 'redux-saga/effects';
import {arrayOf} from 'normalizr';
import {receiveUnits} from './actions';
import {UnitActions, unitSchema} from './constants';
import {FetchAction} from '../common/constants';
import {createUrl, createRequest, callApi, normalizeEntityResults} from '../api/helpers';

function* fetchUnits({payload: {params}}: FetchAction) {
  const request = createRequest(createUrl('unit', params));
  const {bodyAsJson} = yield call(callApi, request);
  const data = normalizeEntityResults(bodyAsJson.results, arrayOf(unitSchema));
  yield put(receiveUnits(data));
}

function* watchFetchUnits() {
  yield takeLatest(UnitActions.FETCH, fetchUnits)
}

export default function* saga() {
  return [
    yield fork(watchFetchUnits)
  ]
}