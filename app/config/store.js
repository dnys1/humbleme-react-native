import { createStore, applyMiddleware } from 'redux';
import Logger from 'redux-logger';

import Reducers from '../reducers';

const middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware.push(Logger);
}

export default createStore(Reducers, applyMiddleware(...middleware));
