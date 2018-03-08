import { createStore, applyMiddleware } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import Logger from 'redux-logger';

import reducers from '../reducers';

const middleware = [];

// Must be run before createReduxBoundAddListener
middleware.push(createReactNavigationReduxMiddleware('root', state => state.nav));

if (process.env.NODE_ENV === 'development') {
  middleware.push(Logger);
}

export default createStore(reducers, applyMiddleware(...middleware));
