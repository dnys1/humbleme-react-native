import { SHOW_WARNING, CLEAR_WARNING, SHOW_ERROR, CLEAR_ERROR } from '../actions/app';

const initialState = {
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        error: {
          type: action.payload.type,
          alertStyle: 'error',
          title: action.payload.title,
          msg: action.payload.msg,
        },
      };
    case SHOW_WARNING:
      return {
        ...state,
        error: {
          type: action.payload.type,
          alertStyle: 'warn',
          title: action.payload.title,
          msg: action.payload.msg,
        },
      };
    case CLEAR_WARNING:
    case CLEAR_ERROR:
      return {
        ...state,
        error: {},
      };
    default:
      return state;
  }
};
