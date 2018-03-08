import { combineReducers } from 'redux';

import welcome from './welcome';
import nav from './nav';

export default combineReducers({
  welcome,
  nav,
});
