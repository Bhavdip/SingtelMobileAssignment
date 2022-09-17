import {combineReducers} from 'redux';
import {appReducer} from '../reudx/reducer';

export const combinedReducers = combineReducers({
  appReducer: appReducer,
});
