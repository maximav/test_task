import { getFetchSaga } from '../utils/fetch';
import { takeLatest } from 'redux-saga/effects';
import * as CONSTS from './consts';
import * as api from '../api';
import { history } from '../../commons';
import { getModal } from '../../utils/queryParams';


const uploadFile = {
  type: CONSTS.CURRENT,
  apiMethod: api.uploadFile,
  handleSuccess: function(response) {
    const modal = getModal(history);
    modal[1]();

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
