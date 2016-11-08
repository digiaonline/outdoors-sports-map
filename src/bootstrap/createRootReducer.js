import {combineReducers} from 'redux';
import unitReducer from '../modules/unit/reducer';
import mapReducer from '../modules/map/reducer';

const createRootReducer = () =>
  combineReducers({
    unit: unitReducer,
    map: mapReducer
  });

export default createRootReducer;
