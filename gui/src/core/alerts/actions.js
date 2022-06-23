import * as actionTypes from './consts';

export const showAlertMessageAction = message => {
  return {
    type: actionTypes.SHOW_ALERT_MESSAGE,
    payload: message
  };
};

export const hideAlertMessageAction = message => {
  return {
    type: actionTypes.HIDE_ALERT_MESSAGE,
    payload: message
  };
};
