import qs from 'query-string';
import {pageSizes} from '../../const';
import {showAlertMessageAction} from '../alerts/actions';
import { getFetchSaga } from '../utils/fetch';
import {put, takeLatest} from 'redux-saga/effects';
import {fetchFiles} from './actions';
import * as CONSTS from './consts';
import * as api from '../api';
import { history } from '../../commons';
import { getModal } from '../../utils/queryParams';


const uploadFile = {
  type: CONSTS.CURRENT,
  apiMethod: api.uploadFile,
  handleSuccess: function*(response) {
    const modal = getModal(history);
    modal[1]();
    const message = {
      text: 'Файл загружен',
      severity: 'info'
    };
    yield put(showAlertMessageAction(message));
    const query = qs.parse(history.location.search);
    const page = parseInt(query.page || 1);
    const pageSize = parseInt(query.pageSize || pageSizes[0]);
    yield put(fetchFiles(page, pageSize));
    return response.data;
  }
};

const listFiles = {
  type: CONSTS.LIST,
  apiMethod: api.listFiles
};

export default function*() {
  yield takeLatest(CONSTS.FETCH, getFetchSaga(listFiles));
  yield takeLatest(CONSTS.UPLOAD, getFetchSaga(uploadFile));
}
