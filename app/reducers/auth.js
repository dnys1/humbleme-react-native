import {
  LOG_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  CONFIRM_SIGNUP_SUCCESS,
  UPDATE_NAME_SUCCESS,
} from '../actions/welcome';
import { LOG_OUT_SUCCESS, IMAGE_UPLOAD_SUCCESS } from '../actions/app';

const initialState = {
  user: {},
  userConfirmed: false,
  userSub: '',
  images: {},
  profile: '',
  username: '',
  id: null,
  attributes: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        userConfirmed: action.payload.userConfirmed,
        userSub: action.payload.userSub,
      };
    case CONFIRM_SIGNUP_SUCCESS:
      return {
        ...state,
        userConfirmed: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        attributes: action.payload.attributes,
        username: action.payload.username,
        id: action.payload.id,
      };
    case LOG_OUT_SUCCESS:
      return initialState;
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        images: {
          [action.payload.key]: {
            type: action.payload.type,
            imageURL: action.payload.imageURL,
          },
        },
        profile: (action.payload.type === 'profile' && action.payload.key) || state.profile,
      };
    case UPDATE_NAME_SUCCESS:
      return {
        ...state,
        attributes: {
          ...state.attributes,
          given_name: action.name.split(' ')[0],
          family_name: action.name.split(' ')[1],
        },
      };
    default:
      return state;
  }
};
