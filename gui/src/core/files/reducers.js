import { combineReducers } from 'redux';

import * as CONSTS from './consts';
import { getFetchReducer } from '../utils/fetch';

export default {
  [CONSTS.DOMAIN]: combineReducers({
    [CONSTS.CURRENT_NAME]: getFetchReducer(CONSTS.CURRENT),
    [CONSTS.LIST_NAME]: getFetchReducer(CONSTS.LIST)
  })
};
