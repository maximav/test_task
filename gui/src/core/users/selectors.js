import * as CONSTS from './consts';
import { getDomainSelector } from '../utils/fetch';
import { getListPayload } from '../../utils/paginator';

const mePath = [CONSTS.DOMAIN, CONSTS.ME_NAME];
const listPath = [CONSTS.DOMAIN, CONSTS.LIST_NAME];
const currentPath = [CONSTS.DOMAIN, CONSTS.CURRENT_NAME];

export const meSelector = getDomainSelector(mePath, null);

const _usersListSelector = getDomainSelector(listPath, null);

export const listSelector = state => {
  const { payload, isFetching, isFetched } = _usersListSelector(state);
  return { isFetching, isFetched, ...getListPayload(payload || {}) };
};

export const userSelector = getDomainSelector(currentPath, {});
