import {combineReducers} from 'redux';
import unitReducer from '../modules/unit/reducer';
import mapReducer from '../modules/map/reducer';
import languageReducer from '../modules/language/reducer';
import searchReducer from '../modules/search/reducer';

const createRootReducer = () =>
  combineReducers({
    language: languageReducer,
    unit: unitReducer,
    map: mapReducer,
    search: searchReducer
  });

export default createRootReducer;
