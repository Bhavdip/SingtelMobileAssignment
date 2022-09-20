import { combineReducers } from 'redux';
import { appReducer } from '../feature/reudx/reducer';

export const combinedReducers = combineReducers({
  appReducer
});
