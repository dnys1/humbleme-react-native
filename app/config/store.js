import { createStore, applyMiddleware } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// Must be run before createReduxBoundAddListener
middleware.push(createReactNavigationReduxMiddleware('root', state => state.nav));
// Always last in stack
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['nav', 'network', 'welcome', 'app'],
};

const persistReducer = persistCombineReducers(persistConfig, reducers);

const configureStore = () => {
  const store = createStore(persistReducer, applyMiddleware(...middleware));
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  // persistor.purge();

  return { store, persistor };
};

export default configureStore;
