import { combineReducers } from 'redux';

import * as CONSTS from './consts';
import { getFetchReducer } from '../utils/fetch';

export default {
  [CONSTS.DOMAIN]: combineReducers({
    [CONSTS.ME_NAME]: getFetchReducer(CONSTS.FETCH_ME),
    [CONSTS.LIST_NAME]: getFetchReducer(CONSTS.FETCH_LIST),
    [CONSTS.CURRENT_NAME]: getFetchReducer(CONSTS.FETCH_CURRENT)
  })
};
