import { Keyboard } from 'react-native';
import { take, put, fork, race } from 'redux-saga/effects';

import { DISMISS_KEYBOARD } from '../actions/app';

function* watchNavTransition() {
  while (true) {
    yield race({
      back: take('Navigation/BACK'),
      navigate: take('Navigation/NAVIGATE'),
    });
    yield put({ type: DISMISS_KEYBOARD });
    Keyboard.dismiss();
  }
}

export default function* () {
  yield fork(watchNavTransition);
}
