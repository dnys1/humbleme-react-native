import { Storage } from 'aws-amplify';
import { take, fork, put } from 'redux-saga/effects';
import path from 'path';
import mime from 'mime-types';
import { Buffer } from 'buffer';

import { IMAGE_UPLOAD, IMAGE_UPLOAD_FAILURE, IMAGE_UPLOAD_SUCCESS } from '../actions/app';

function* uploadImage() {
  const { payload: { image, type } } = yield take(IMAGE_UPLOAD);
  // get mime-type
  const filename = path.basename(image.uri);
  const extname = path.extname(image.uri);
  const contentType = mime.lookup(extname);
  const imageBuffer = Buffer.from(image.base64, 'base64');
  const level = 'protected';
  // const profile = yield Cache.get('profile');
  try {
    try {
      yield Storage.remove(`photos/profile${extname}`, { level });
    } catch (err) {
      console.log('Error removing old profile pic: ', err);
    }
    yield Storage.put(`photos/${filename}`, imageBuffer, { level, contentType });
    const response = yield Storage.put(`photos/profile${extname}`, imageBuffer, {
      level,
      contentType,
    });
    const imageURL = yield Storage.get(response.key, { level });
    yield put({ type: IMAGE_UPLOAD_SUCCESS, payload: { ...response, type, imageURL } });
  } catch (err) {
    console.log(err);
    yield put({ type: IMAGE_UPLOAD_FAILURE, err });
  }
}

export default function* () {
  yield fork(uploadImage);
}
