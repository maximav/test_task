import * as React from 'react'
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {meSelector} from '../../core/users/selectors';
import {getLocation} from '../../Routes';
import {useHistory} from 'react-router';
import { fetchLogoutAction } from '../../core/users/actions';
import {useAction} from '../../utils/hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
  },
  title: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const { payload: user} = useSelector(meSelector);
  const loc = getLocation();
  const history = useHistory();
  const logout = useAction(fetchLogoutAction);
  const loginHandler = () => {
    history.push(loc.SignIn());
  };
  const logoutHandler = () => {
    logout();
  };
  const handleClickLogo = () => {
    history.push(loc.main());
  }

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <Typography
          className={classes.title}
          noWrap onClick={handleClickLogo} variant="h6">
            Application
        </Typography>
        {loc.SignIn() !== loc.current() ? !user ?
          <Button
            color="inherit"
            onClick={loginHandler}>Login</Button> :
          <Button
            color="inherit"
            onClick={logoutHandler}>Logout</Button>: ''}
      </Toolbar>
    </AppBar>
  )
}
export default Navbar;