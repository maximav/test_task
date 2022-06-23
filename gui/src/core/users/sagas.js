import { fetchSaga, getFetchSaga, clearSaga } from '../utils/fetch';
import { takeLatest, put } from 'redux-saga/effects';
import * as CONSTS from './consts';
import * as api from '../api';
import { appLoaded } from '../app/actions';
import { notificationsConnect } from '../notifications/actions';
import { fetchMeAction } from './actions';

import { showAlertMessageAction } from '../alerts/actions';

const fetchMeConfig = {
  type: CONSTS.FETCH_ME,
  apiMethod: api.fetchMe,
  handleSuccess: function*(response) {
    yield put(appLoaded());
    yield put(notificationsConnect(0));
    return response.data;
  },
  handleError: function*(e) {
    yield put(appLoaded());
    return e;
  }
};

const fetchLogin = {
  type: CONSTS.FETCH_ME,
  apiMethod: api.login,
  handleSuccess: function*(e) {
    const username = e && e.data && e.data.username;

    const message = {
      text: `Successful authorization. Greets you, ${username}.`,
      severity: 'info'
    };
    yield put(showAlertMessageAction(message));

    return e.data;
  },
  handleError: function*(e) {
    const message = {
      text: 'Invalid credentials, try again please',
      severity: 'error'
    };
    yield put(showAlertMessageAction(message));

    return e;
  }
};

const fetchLogout = {
  type: CONSTS.FETCH_ME,
  apiMethod: api.logout,
  handleSuccess: function*() {
    const message = {
      text: 'Logged Out',
      severity: 'info'
    };
    yield put(showAlertMessageAction(message));
    return null;
  },
  handleError: function*(e) {
    yield put(clearSaga(fetchMeAction()));
    return e;
  }
};

const getUsers = {
  type: CONSTS.FETCH_LIST,
  apiMethod: api.listUsers
};

const getUser = {
  type: CONSTS.FETCH_CURRENT,
  apiMethod: api.fetchUser
};


export default function*() {
  yield* fetchSaga(fetchMeConfig);
  yield takeLatest(CONSTS.LOGIN, getFetchSaga(fetchLogin));
  yield takeLatest(CONSTS.LOGOUT, getFetchSaga(fetchLogout));
  yield takeLatest(CONSTS.LIST, getFetchSaga(getUsers));
  yield takeLatest(CONSTS.CURRENT, getFetchSaga(getUser));
}
