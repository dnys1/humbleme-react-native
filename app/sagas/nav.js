import { Keyboard } from 'react-native';
import { take, fork, put, race, all, takeEvery } from 'redux-saga/effects';

import { NAV_LOGGED_IN_SCREEN } from '../actions/nav';
import { DISMISS_KEYBOARD } from '../actions/app';
import { CLEAR_SIGNUP_DATA, CLEAR_LOGIN_DATA } from '../actions/welcome';

// Take every back button press (takeEvery will never win), until user logins in
function* watchBackNav() {
  yield race([takeEvery('Navigation/BACK', () => null), take(NAV_LOGGED_IN_SCREEN)]);
  yield put({ type: CLEAR_SIGNUP_DATA });
  yield put({ type: CLEAR_LOGIN_DATA });
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
