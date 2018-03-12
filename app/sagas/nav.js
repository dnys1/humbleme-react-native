import { Keyboard } from 'react-native';
import { take, fork, put, race, all } from 'redux-saga/effects';

import { NAV_LOGGED_IN_SCREEN } from '../actions/nav';
import { DISMISS_KEYBOARD } from '../actions/app';
import { CLEAR_SIGNUP_DATA, CLEAR_LOGIN_DATA } from '../actions/welcome';

function* watchBackNav() {
  while (true) {
    yield race([take('Navigation/BACK'), take(NAV_LOGGED_IN_SCREEN)]);
    yield put({ type: CLEAR_SIGNUP_DATA });
    yield put({ type: CLEAR_LOGIN_DATA });
  }
}

function* watchNavTransition() {
  while (true) {
    yield take(['Navigation/BACK', 'Navigation/NAVIGATE', NAV_LOGGED_IN_SCREEN]);
    yield put({ type: DISMISS_KEYBOARD });
    Keyboard.dismiss();
  }
}

export default function* () {
  yield all([fork(watchNavTransition), fork(watchBackNav)]);
}
