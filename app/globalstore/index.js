import {createStore} from 'redux';
import {combinedReducers} from './reducers';
const globalStore = createStore(combinedReducers);
export default globalStore;
