import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combinedReducers } from './reducers';
import sagas from './saga';

const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middlewares));
const globalStore = createStore(combinedReducers, enhancers);

sagaMiddleware.run(sagas);

export default globalStore;
