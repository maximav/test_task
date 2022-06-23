import * as CONSTS from './consts';
import { getDomainSelector } from '../utils/fetch';
import { fromPairs } from '../../utils/tools';

const listPath = [CONSTS.DOMAIN, CONSTS.LIST_NAME];
const currentPath = [CONSTS.DOMAIN, CONSTS.CURRENT_NAME];

const _matrixListSelector = getDomainSelector(listPath, null);

export const fileListSelector = state => {
  const { payload, isFetching, isFetched } = _matrixListSelector(state);
  return {
    isFetching,
    isFetched,
    items: payload || [],
    itemsById:
      payload && payload.length ? fromPairs(payload.map(i => [i.id, i])) : []
  };
};

const _uploadSelector = getDomainSelector(currentPath, {});

export const uploadSelector = state => {
  const { isFetching } = _uploadSelector(state);
  return { uploading: isFetching || false };
};
