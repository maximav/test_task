import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer, List, ListItem, ListItemIcon} from '@material-ui/core';
import SidebarNav from './SidebarNavs/SidebarNav';
import { css } from '../../const';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const useStyles = makeStyles(theme => ({
  drawer: {
    width: css.drawerWidth,
    backgroundColor: theme.palette.primary.main,
    overflowX: 'hidden'
  },
  drawerOpen: {
    width: css.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(8)
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
    justifyContent: 'space-between'
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  chevronPart: {
    width: '100%',
    position: 'relative'
  },
  chevron: {
    position: 'fixed',
    width: css.chevronSize,
    height: css.chevronSize,
    bottom: css.topBarHeight - (css.chevronSize / 2),
    left: css.drawerWidth - (css.chevronSize / 2),
    border: `2px solid ${theme.palette.secondary.main}`,
    zIndex: theme.zIndex.drawer + 3,
    borderRadius: css.chevronSize,
    backgroundColor: `${theme.palette.secondary.contrastText}!important`,
    color: `${theme.palette.primary.main}!important`,
    transition: theme.transitions.create(['transform', 'left', 'right'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    '&:hover': {
      cursor: 'pointer'
    }
  },
  chevronShift: {
    transform: 'rotate(180deg)',
    left: theme.spacing(8) - (css.chevronSize / 2)
  },
  logoListItem: {
    padding: theme.spacing(1, 2, 1, 2.5)
  },
  logo: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontSize: '2rem'
  },
  icon: {
    fill: theme.palette.secondary.main + '!important',
    strokeWidth: '0.2px',
    stroke: theme.palette.secondary.main + '!important',
  }
}));

const Sidebar = props => {
  const { open, onClose, toggleSidebar, variant, className, ...rest } = props;
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <List>
        <ListItem className={classes.logoListItem}>
          <ListItemIcon>
            <div className={classes.logo}>{open ? 'Application': 'A'}</div>
          </ListItemIcon>
        </ListItem>
      </List>
      <div className={classes.chevronPart}>
        <div
          className={clsx(classes.chevron, {
            [classes.chevronShift]: !open
          })}
          onClick={toggleSidebar}
        >
          <ChevronLeftIcon className={classes.icon}/>
        </div>

      </div>
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <SidebarNav
          className={classes.nav}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
