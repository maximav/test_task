import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton} from '@material-ui/core';
import { useAction } from '../../utils/hooks';
import { fetchLogoutAction } from '../../core/users/actions';
import { css } from '../../const';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {getLocation} from '../../Routes';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles(theme => ({
  appBar: {
    boxShadow: 'none',
    color: theme.palette.text.primary,
    width: `calc(100% - ${css.drawerClosedWidth}px - ${css.drawerBorderWidth}px)`,
    backgroundColor: theme.palette.secondary.contrastText,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '& > .MuiToolbar-regular': {
      height: css.topBarHeight
    }
  },
  appBarShift: {
    marginLeft: css.drawerWidth,
    width: `calc(100% - ${css.drawerWidth}px - ${css.drawerBorderWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  backButton: {
    '&.MuiButton-root': {
      minWidth: 0
    }
  },
  toolbar: {
    padding: theme.spacing(0, 4)
  },
  bottomBorder: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  icon: {
    width: 22,
    stroke: theme.palette.secondary.main,
    fill: theme.palette.secondary.main,
    strokeWidth: '0.2px'
  },
  header: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase'
  }
}));


const Topbar = props => {
  const { open, ...rest } = props;
  const logout = useAction(fetchLogoutAction);
  const {t} = useTranslation();
  const loc = getLocation();

  const headers = {
    [loc.Dashboard()]: t('dashboard')

  };

  const header = headers[loc.current()];
  const classes = useStyles();
  return (
    <AppBar
      {...rest}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.bottomBorder}>
          <div className={classes.header}>{header}</div>
          <div className={classes.flexGrow} />
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={() => logout()}
          >
            <ExitToAppIcon className={classes.icon} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool.isRequired
};

export default Topbar;
