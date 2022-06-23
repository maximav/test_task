import { createAction } from 'redux-actions';
import * as CONSTS from './consts';

export const notificationsConnect = createAction(
  CONSTS.CONNECT_ACTION,
  undefined,
  undefined
);

export const receiveNotification = createAction(
  CONSTS.RECEIVE_ACTION,
  undefined,
  undefined
);
