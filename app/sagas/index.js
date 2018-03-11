import { Auth } from 'aws-amplify';
import { take, call, put, fork, all, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { getNetworkIsConnectedAndHasChecked } from './selectors';
import navSagas from './nav';

import {
  RESEND_SIGNUP,
  RESEND_SIGNUP_SUCCESS,
  RESEND_SIGNUP_FAILURE,
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CONFIRM_SIGNUP,
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE,
  CONFIRM_LOGIN_SUCCESS,
  CONFIRM_LOGIN_FAILURE,
  CONFIRM_LOGIN,
} from '../actions/welcome';

import {
  APPLICATION_LOADED,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SHOW_WARNING,
  SHOW_ERROR,
  CLEAR_WARNING,
  CLEAR_ERROR,
  CLEAR_TEMPORARY_DATA,
} from '../actions/app';

import {
  NAV_SIGNUP_CONFIRMATION_MODAL,
  NAV_LOGIN_SCREEN,
  NAV_LOGGED_IN_SCREEN,
  // NAV_LOGIN_CONFIRMATION_MODAL,
} from '../actions/nav';

import { CHANGE_CONNECTION_STATUS } from '../actions/network';

function* logIn({ username, password }) {
  try {
    const payload = yield Auth.signIn(username, password);

    if (payload) {
      yield put({ type: LOG_IN_SUCCESS, payload });
      // yield put({ type: NAV_LOGIN_CONFIRMATION_MODAL });
      yield put({ type: NAV_LOGGED_IN_SCREEN });
    } else {
      console.log('User is empty');
    }
  } catch (err) {
    if (err.code === 'UserNotConfirmedException') {
      yield put({ type: RESEND_SIGNUP, payload: { username } });
    } else if (err.code === 'UserNotFoundException') {
      yield put({
        type: SHOW_ERROR,
        payload: {
          type: 'login',
          title: 'Login Error',
          msg: 'Username not found. Please try again or return to the home screen to signup.',
        },
      });
      yield call(delay, 200);
      yield put({ type: CLEAR_ERROR, payload: { type: 'login' } });
    } else if (err.code === 'NotAuthorizedException') {
      yield put({
        type: SHOW_ERROR,
        payload: {
          type: 'login',
          title: 'Login Error',
          msg: 'Incorrect username or password.',
        },
      });
      yield call(delay, 200);
      yield put({ type: CLEAR_ERROR, payload: { type: 'login' } });
    }
    yield put({ type: LOG_IN_FAILURE, err });
    console.log('Login error: ', err);
  }
}

function* confirmLogin({ user, TFACode }) {
  try {
    yield Auth.confirmSignIn(user, TFACode);
    yield put({ type: CONFIRM_LOGIN_SUCCESS });
    yield put({ type: NAV_LOGGED_IN_SCREEN });
  } catch (err) {
    yield put({ type: CONFIRM_LOGIN_FAILURE });
    console.log('Confirm login err: ', err);
  }
}

function* resendSignUp({ username }) {
  try {
    console.log(username);
    yield Auth.resendSignUp(username);
    yield put({ type: RESEND_SIGNUP_SUCCESS });
    yield put({ type: NAV_SIGNUP_CONFIRMATION_MODAL, resend: true });
  } catch (err) {
    yield put({ type: RESEND_SIGNUP_FAILURE });
    console.log('Resend signup error: ', err);
  }
}

function* signUp({
  username, password, email, phone_number,
}) {
  try {
    const payload = yield Auth.signUp({ username, password, attributes: { phone_number, email } });
    yield put({ type: SIGN_UP_SUCCESS, payload });
    yield put({ type: NAV_SIGNUP_CONFIRMATION_MODAL, resend: false });
  } catch (err) {
    if (err.code === 'InvalidPasswordException') {
      yield put({
        type: SHOW_ERROR,
        payload: {
          type: 'signup',
          title: 'Password Error',
          msg:
            'Passwords must be 8 characters long and contain:\n\t- uppercase letters\n\t- lowercase letters\n\t- numbers',
        },
      });
      yield call(delay, 200);
      yield put({ type: CLEAR_ERROR, payload: { type: 'signup' } });
    } else if (err.code === 'UsernameExistsException') {
      yield put({
        type: SHOW_ERROR,
        payload: {
          type: 'signup',
          title: 'Signup Error',
          msg: 'That username already exists.',
        },
      });
      yield call(delay, 200);
      yield put({ type: CLEAR_ERROR, payload: { type: 'signup' } });
    }
    yield put({ type: SIGN_UP_FAILURE, err });
    console.log('Signup error: ', err);
  }
}

function* confirmSignup({
  username, password, TFACode, resend,
}) {
  try {
    yield Auth.confirmSignUp(username, TFACode);
    yield put({ type: CONFIRM_SIGNUP_SUCCESS });
    if (resend) {
      yield put({ type: LOG_IN, payload: { username, password } });
    } else {
      yield put({ type: NAV_LOGIN_SCREEN });
    }
  } catch (err) {
    yield put({ type: CONFIRM_SIGNUP_FAILURE, err });
    console.log('Confirm signup error: ', err);
  }
}

function* logOut() {
  try {
    yield Auth.signOut();
    yield put({ type: LOG_OUT_SUCCESS });
    yield put({ type: CLEAR_TEMPORARY_DATA });
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE, err });
    console.log('Logout error: ', err);
  }
}

/* WATCHERS */

function* watchNetwork() {
  while (true) {
    yield take(CHANGE_CONNECTION_STATUS);
    const connected = yield select(getNetworkIsConnectedAndHasChecked);
    if (!connected) {
      yield put({
        type: SHOW_WARNING,
        payload: {
          type: 'network',
          title: 'Warning',
          msg: 'No internet connection. Features will be unavailable.',
        },
      });
      yield call(delay, 200);
      yield put({ type: CLEAR_WARNING, payload: { type: 'network' } });
    } else {
      // connected to Internet
    }
  }
}

function* watchLogin() {
  while (true) {
    const { payload: { username, password } } = yield take(LOG_IN);
    yield call(logIn, { username, password });
  }
}

function* watchConfirmLogin() {
  while (true) {
    const { payload: { user, TFACode } } = yield take(CONFIRM_LOGIN);
    yield call(confirmLogin, { user, TFACode });
  }
}

function* watchSignup() {
  while (true) {
    const {
      payload: {
        username, password, email, phone_number,
      },
    } = yield take(SIGN_UP);
    yield call(signUp, {
      username,
      password,
      email,
      phone_number,
    });
  }
}

function* watchConfirmSignup() {
  while (true) {
    const {
      payload: {
        username, password, TFACode, resend,
      },
    } = yield take(CONFIRM_SIGNUP);
    yield call(confirmSignup, {
      username,
      password,
      TFACode,
      resend,
    });
  }
}

function* watchResendSignup() {
  while (true) {
    const { payload: { username } } = yield take(RESEND_SIGNUP);
    yield call(resendSignUp, { username });
  }
}

function* watchLogout() {
  while (true) {
    yield take(LOG_OUT);
    yield call(logOut);
  }
}

function* watchAppLoad() {
  yield take(APPLICATION_LOADED);
  try {
    if (yield Auth.currentSession()) {
      yield put({ type: NAV_LOGGED_IN_SCREEN });
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchAppLoad),
    fork(watchNetwork),
    fork(watchLogin),
    fork(watchConfirmLogin),
    fork(watchResendSignup),
    fork(watchSignup),
    fork(watchConfirmSignup),
    fork(watchLogout),
    navSagas(),
  ]);
}
