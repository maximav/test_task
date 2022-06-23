import * as actionTypes from './consts';
import { updateObject } from '../../utils/dataTools';

const initialState = {
  showedMessageAlert: false,
  message: null
};

const alerts = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SHOW_ALERT_MESSAGE:
    return updateObject(state, {
      showedMessageAlert: true,
      message: action.payload
    });
  case actionTypes.HIDE_ALERT_MESSAGE:
    return updateObject(state, {
      showedMessageAlert: false,
      message: action.payload
    });
  default:
    return state;
  }
};

export default alerts;
