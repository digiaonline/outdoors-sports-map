import {combineReducers} from 'redux';
import unitReducer from '../modules/unit/reducer';
import mapReducer from '../modules/map/reducer';
import searchReducer from '../modules/search/reducer';

const createRootReducer = () =>
  combineReducers({
    unit: unitReducer,
    map: mapReducer,
    search: searchReducer
  });

export default createRootReducer;
