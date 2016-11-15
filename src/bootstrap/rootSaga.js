import {fork} from 'redux-saga/effects';
import unitSaga from '../modules/unit/saga';
import searchSaga from '../modules/search/saga';

export default function* rootSaga() {
  yield [
    fork(unitSaga),
    fork(searchSaga)
  ];
}
