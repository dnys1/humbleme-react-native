import { createStore, applyMiddleware } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const middleware = [];

// Must be run before createReduxBoundAddListener
middleware.push(createReactNavigationReduxMiddleware('root', state => state.nav));
middleware.push(thunk);
// Always last in stack
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export default createStore(reducers, applyMiddleware(...middleware));
