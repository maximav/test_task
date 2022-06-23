import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

const enhancers =
  process.env.NODE_ENV !== 'production'
    ? composeWithDevTools(middleware)
    : middleware;

const store = createStore(reducers, enhancers);

sagas.forEach(saga => sagaMiddleware.run(saga));

export default store;
