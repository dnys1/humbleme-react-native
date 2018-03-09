import { Auth } from 'aws-amplify';
import { take, put } from 'redux-saga/effects';

import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  RESEND_SIGNUP,
  RESEND_SIGNUP_SUCCESS,
  RESEND_SIGNUP_FAILURE,
  SHOW_SIGNUP_CONFIRMATION_MODAL,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CONFIRM_SIGNUP,
  CONFIRM_SIGNUP_SUCCESS,
  CONFIRM_SIGNUP_FAILURE,
  SHOW_LOGIN_SCREEN,
} from '../actions/welcome';

function* resendSignUp() {
  const { username } = yield take(RESEND_SIGNUP);
  try {
    yield Auth.resendSignUp(username);
    yield put({ type: RESEND_SIGNUP_SUCCESS });
    yield put({ type: SHOW_SIGNUP_CONFIRMATION_MODAL, resend: true });
  } catch (err) {
    yield put({ type: RESEND_SIGNUP_FAILURE });
    console.log('Resend signup error: ', err);
  }
}

function* logOut() {
  yield take(LOG_OUT);
  try {
    yield Auth.signOut();
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE, err });
    console.log('Logout error: ', err);
  }
}

function* logIn() {
  const { username, password } = yield take(LOG_IN);
  try {
    const user = yield Auth.signIn(username, password);
    yield put({ type: LOG_IN_SUCCESS, user });
  } catch (err) {
    if (err.code === 'UserNotConfirmedException') {
      yield put({ type: RESEND_SIGNUP, username });
    } else if (err.code === 'UserNotFoundException') {
      // TODO: Alert user
    }
    yield put({ type: LOG_IN_FAILURE, err });
    console.log('Login error: ', err);
  }
}

function* signUp() {
  const {
    username, email, password, phone_number,
  } = yield take(SIGN_UP);
  try {
    yield Auth.signUp({ username, password, attributes: { phone_number, email } });
    yield put({ type: SIGN_UP_SUCCESS });
    yield put({ type: SHOW_SIGNUP_CONFIRMATION_MODAL, resend: false });
  } catch (err) {
    if (err.code === 'InvalidPasswordException') {
      // TODO: Alert password rules
    } else if (err.code === 'UsernameExistsException') {
      // TODO: Alert username already exists
    }
    yield put({ type: SIGN_UP_FAILURE, err });
    console.log('Signup error: ', err);
  }
}

function* confirmSignup() {
  const {
    username, password, TFACode, resend,
  } = yield take(CONFIRM_SIGNUP);
  try {
    yield Auth.confirmSignUp(username, TFACode);
    yield put({ type: CONFIRM_SIGNUP_SUCCESS });
    if (resend) {
      yield put({ type: LOG_IN, username, password });
    } else {
      yield put({ type: SHOW_LOGIN_SCREEN });
    }
  } catch (err) {
    yield put({ type: CONFIRM_SIGNUP_FAILURE, err });
    console.log('Confirm signup error: ', err);
  }
}

// function* confirmLogin() {}

export default function* rootSaga() {
  yield null;
}
