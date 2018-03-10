import { Keyboard } from 'react-native';
import { take, put, fork } from 'redux-saga/effects';

import * as actions from '../actions/nav';
import { DISMISS_KEYBOARD } from '../actions/app';

function* watchNavTransition() {
  while (true) {
    yield take(['Navigation/BACK', 'Navigation/NAVIGATE', Object.values(actions)]);
    yield put({ type: DISMISS_KEYBOARD });
    Keyboard.dismiss();
  }
}

export default function* () {
  yield fork(watchNavTransition);
}
