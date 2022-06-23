import * as CONSTS from './consts';

export const fetchMeAction = () => ({
  type: CONSTS.FETCH_ME
});

export const fetchLoginAction = (username, password) => ({
  type: CONSTS.LOGIN,
  payload: { username, password }
});

export const fetchLogoutAction = () => ({
  type: CONSTS.LOGOUT
});

export const fetchUsers = (page, pageSize) => ({
  type: CONSTS.LIST,
  payload: { pageSize, page: page || 1 }
});

export const fetchUser = id => ({
  type: CONSTS.CURRENT,
  payload: { id }
});
