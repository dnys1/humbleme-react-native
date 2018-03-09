import { combineReducers } from 'redux';

import welcome from './welcome';
import nav from './nav';
import network from './network';

export default combineReducers({
  welcome,
  nav,
  network,
});
