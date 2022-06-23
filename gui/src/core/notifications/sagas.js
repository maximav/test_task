import {delay, takeLatest, takeLeading} from '@redux-saga/core/effects';
import * as CONSTS from './consts';
import connect from './connect';


const RECONNECT_DELAY = 5000;
const MAX_RECONNECT_COUNT = 12;

const runConnect = function*({ payload }) {
  if (payload) {
    console.log(`Reconnect to notifications after ${RECONNECT_DELAY / 1000}s`);
    yield delay(RECONNECT_DELAY);
  }
  // TODO: need drop counter when success connect
  if (payload <= MAX_RECONNECT_COUNT) connect(payload);
};


const receiveMessage = function({ payload }) {
  console.log('payload', payload)

};

export default function*() {
  yield takeLatest(CONSTS.CONNECT_ACTION, runConnect);
  yield takeLeading(CONSTS.RECEIVE_ACTION, receiveMessage);
}
