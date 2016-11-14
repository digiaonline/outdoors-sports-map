import {combineReducers} from 'redux';
import unitReducer from '../modules/unit/reducer';
import mapReducer from '../modules/map/reducer';
import languageReducer from '../modules/language/reducer';

const createRootReducer = () =>
  combineReducers({
    language: languageReducer,
    unit: unitReducer,
    map: mapReducer
  });

export default createRootReducer;
