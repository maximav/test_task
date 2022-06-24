import * as CONSTS from './consts';

export const uploadFile = (file, name) => ({
  type: CONSTS.UPLOAD,
  payload: { file, name }
});

export const fetchFiles = (page, pageSize) => ({
  type: CONSTS.FETCH,
  payload: { page, pageSize }
});
