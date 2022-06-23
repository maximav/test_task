import { createAction } from 'redux-actions';
import * as CONSTS from './consts';

export const startAction = createAction(
  CONSTS.DASHBOARD_ACTION,
  undefined,
  undefined
);
