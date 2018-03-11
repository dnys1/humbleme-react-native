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
  const contentType = mime.lookup(path.extname(image.uri));
  const imageBuffer = Buffer.from(image.base64, 'base64');
  const level = 'protected';
  try {
    const response = yield Storage.put(filename, imageBuffer, { level, contentType });
    const imageURL = yield Storage.get(response.key, { level });
    console.log(imageURL);
    console.log(response, imageURL);
    yield put({ type: IMAGE_UPLOAD_SUCCESS, payload: { ...response, type, imageURL } });
  } catch (err) {
    console.log(err);
    yield put({ type: IMAGE_UPLOAD_FAILURE, err });
  }
}

export default function* () {
  yield fork(uploadImage);
}
