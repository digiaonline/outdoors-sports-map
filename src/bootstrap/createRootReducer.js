import {combineReducers} from 'redux';
import unitReducer from '../modules/unit/reducer';
import mapReducer from '../modules/map/reducer';
import homeReducer from '../modules/home/reducer';

const createRootReducer = () =>
  combineReducers({
    home: homeReducer,
    unit: unitReducer,
    map: mapReducer
  });

export default createRootReducer;
