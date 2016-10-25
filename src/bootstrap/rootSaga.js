import {fork} from 'redux-saga/effects';
import unitSaga from '../modules/unit/saga';

export default function* rootSaga() {
  yield [
    fork(unitSaga)
  ]
}