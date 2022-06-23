import * as CONSTS from './consts';
import { createAction } from 'redux-actions';

export const appLoaded = createAction(CONSTS.APP_LOADED, undefined, undefined);
