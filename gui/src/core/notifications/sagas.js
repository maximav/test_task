import {delay, takeLatest, takeLeading} from '@redux-saga/core/effects';
import qs from 'query-string';
import {put} from 'redux-saga/effects';
import {history} from '../../commons';
import {pageSizes} from '../../const';
import {fetchFiles} from '../files/actions';
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

const UPDATE_FILES = 'update_files';

const receiveMessage = function*({ payload }) {
  console.log('payload', payload)
  const action = payload.payload.action;
  if (action && action === UPDATE_FILES) {
    const query = qs.parse(history.location.search);
    const page = parseInt(query.page || 1);
    const pageSize = parseInt(query.pageSize || pageSizes[0]);
    yield put(fetchFiles(page, pageSize));
  }

};

export default function*() {
  yield takeLatest(CONSTS.CONNECT_ACTION, runConnect);
  yield takeLeading(CONSTS.RECEIVE_ACTION, receiveMessage);
}
