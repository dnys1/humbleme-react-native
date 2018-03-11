import { CHANGE_CONNECTION_STATUS } from '../actions/network';
import { SHOW_WARNING, SHOW_ERROR, CLEAR_WARNING, CLEAR_ERROR } from '../actions/app';

const initialState = {
  status: {
    type: 'unknown',
    effectiveType: 'unknown',
  },
  connected: false,
  hasCheckedStatus: false,
  error: {},
};

const isConnected = (status) => {
  if (status.type.toLowerCase() === 'none' || status.type.toLowerCase() === 'unknown') {
    return false;
  }
  return true;
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
      nextState = {
        ...state,
        status: action.status,
        hasCheckedStatus: true,
        connected: isConnected(action.status),
      };
      break;
    case SHOW_WARNING:
      nextState = action.payload.type === 'network' && {
        ...state,
        error: {
          alertStyle: 'warn',
          title: action.payload.title,
          msg: action.payload.msg,
        },
      };
      break;
    case SHOW_ERROR:
      nextState = action.payload.type === 'network' && {
        ...state,
        error: {
          alertStyle: 'error',
          title: action.payload.title,
          msg: action.payload.msg,
        },
      };
      break;
    case CLEAR_WARNING:
    case CLEAR_ERROR:
      nextState = action.payload.type === 'network' && {
        ...state,
        error: {},
      };
      break;
    default:
      nextState = state;
  }
  return nextState || state;
};
