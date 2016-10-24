import {combineReducers} from 'redux';
import homeReducer from '../modules/home/reducer';

const createRootReducer = () =>
  combineReducers({
    home: homeReducer
  });

export default createRootReducer;