import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { Sidebar, Topbar } from './components';
import { css } from '../const';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: `calc(100% - ${css.drawerClosedWidth}px - ${css.drawerBorderWidth}px)`,
    marginLeft: `calc(${css.drawerClosedWidth}px + ${css.drawerBorderWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.contrastText
  },
  rootShift: {
    width: `calc(100% - ${css.drawerWidth}px - ${css.drawerBorderWidth}px)`,
    marginLeft: `calc(${css.drawerWidth}px + ${css.drawerBorderWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  content: {
    paddingTop: css.topBarHeight,
    paddingBottom: css.bottomBarHeight,
    height: `calc(100% - ${css.topBarHeight + css.bottomBarHeight}px)`,
    '& > *': {
      height: '100%',
      boxSizing: 'border-box'
    },
    minHeight: `calc(100% - ${1.7 * (css.topBarHeight + css.bottomBarHeight)}px)`,
    overflowY: 'auto'
  }
}));

const Main = props => {
  const { children } = props;
  const classes = useStyles();
  const [openSidebar, setOpenSidebar] = useState(true);

  const closeSidebar = () => {
    setOpenSidebar(false);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.rootShift]: openSidebar
      })}
    >
      <Topbar
        open={openSidebar}
        path={props.path}
      />
      <Sidebar
        onClose={closeSidebar}
        open={openSidebar}
        toggleSidebar={toggleSidebar}
        variant="permanent"
      />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired
};

export default Main;
