import { CHANGE_CONNECTION_STATUS } from '../actions/network';

const initialState = {
  status: {
    type: 'unknown',
    effectiveType: 'unknown',
  },
  connected: false,
  hasCheckedStatus: false,
};

const isConnected = (status) => {
  if (status.type.toLowerCase() === 'none' || status.type.toLowerCase() === 'unknown') {
    return false;
  }
  return true;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        status: action.status,
        hasCheckedStatus: true,
        connected: isConnected(action.status),
      };
    default:
      return state;
  }
};
