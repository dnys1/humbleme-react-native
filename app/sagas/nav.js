import { Keyboard } from 'react-native';
import { take, fork, put } from 'redux-saga/effects';

import { DISMISS_KEYBOARD } from '../actions/app';

function* watchNavTransition() {
  while (true) {
    yield take(['Navigation/BACK', 'Navigation/NAVIGATE']);
    yield put({ type: DISMISS_KEYBOARD });
    Keyboard.dismiss();
  }
}

export default function* () {
  yield fork(watchNavTransition);
}
