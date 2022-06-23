import { combineReducers } from 'redux';
import UsersReducer from './users/reducers';
import AppReducer from './app/reducers';
import FileReducer from './files/reducers';

import alerts from './alerts/reducer';

export default combineReducers({
  ...UsersReducer,
  ...AppReducer,
  ...FileReducer,
  alerts
});
