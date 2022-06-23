import {takeLatest} from '@redux-saga/core/effects';
import {call} from 'redux-saga/effects';
import * as CONSTS from './consts';
import * as api from '../api';

const dashboard = function*({ payload }) {

  try {
    const response = yield call(api.dashboard, payload);
    console.log(payload, response);
  } catch (e)
  {
    console.log('error', e);
  }


};

export default function*() {
  yield takeLatest(CONSTS.DASHBOARD_ACTION, dashboard);
}
