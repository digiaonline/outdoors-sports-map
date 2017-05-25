import {applyMiddleware, compose, createStore as rawCreateStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './createRootReducer';
import rootSaga from './rootSaga';
import {APP_NAME} from '../modules/common/constants';

/**
 * @returns {function}
 */
export const createStore = () =>
  new Promise((resolve) => {
    const rootReducer = createRootReducer();
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [];

    middlewares.push(sagaMiddleware);

    const enhancer = compose(
      applyMiddleware(...middlewares),
      autoRehydrate(),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );

    const store = rawCreateStore(rootReducer, enhancer);

    // The promise returned by "createStore" will be resolved once we have re-hydrated the state.
    persistStore(store, {
      whitelist: ['language', 'map', 'unit', 'service'],
      blacklist: [],
      keyPrefix: `${APP_NAME}:`,
    }, () => resolve(store));

    sagaMiddleware.run(rootSaga);

    if (__DEV__ && module.hot) {
      module.hot.accept('./createRootReducer', () => {
        const newRootReducer = require('./createRootReducer').default();
        store.replaceReducer(newRootReducer);
      });
    }
  });

export default createStore;