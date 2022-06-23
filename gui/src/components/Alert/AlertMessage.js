import { useStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from './Alert';
import { hideAlertMessageAction } from '../../core/alerts/actions';

const AlertMessage = () => {
  const classes = useStyles();

  const showedMessageAlert = useSelector(
    state => state.alerts.showedMessageAlert
  );
  const message = useSelector(state => state.alerts.message);

  const messageType = message && message.severity ? message.severity : 'info';
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideAlertMessageAction(message));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        autoHideDuration={3000}
        onClose={handleClose}
        open={showedMessageAlert}
      >
        <Alert
          onClose={handleClose}
          severity={messageType}
        >
          {message && message.text}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default AlertMessage;
