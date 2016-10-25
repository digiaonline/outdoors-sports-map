import {combineReducers} from 'redux';
import unitReducer from '../modules/unit/reducer';

const createRootReducer = () =>
  combineReducers({
    unit: unitReducer
  });

export default createRootReducer;