export const DOMAIN = 'USERS';

// Reducers
export const ME_NAME = 'ME';
export const CURRENT_NAME = 'CURRENT';
export const LIST_NAME = 'LIST';

// Actions
export const FETCH_LIST = `${DOMAIN}@FETCH_LIST`;
export const FETCH_CURRENT = `${DOMAIN}@FETCH_CURRENT`;
export const FETCH_ME = `${DOMAIN}@FETCH_ME`;

// Actions types
export const LOGIN = `${DOMAIN}@LOGIN`;
export const LOGOUT = `${DOMAIN}@LOGOUT`;
export const CURRENT = `${DOMAIN}@${CURRENT_NAME}`;
export const LIST = `${DOMAIN}@${LIST_NAME}`;