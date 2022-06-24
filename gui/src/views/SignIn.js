import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Container, Typography} from '@material-ui/core';
import {useAction} from '../utils/hooks';
import {fetchLoginAction} from '../core/users/actions';
import {getLocation} from '../Routes';
import {useSelector} from 'react-redux';
import {meSelector} from '../core/users/selectors';
import {Redirect} from 'react-router';
import {Form} from 'react-final-form';
import {String} from '../components/FormFields';
import Checkbox from '../components/FormFields/Checkbox';
import {getValidators, isRequired} from '../utils/validators';
import Navbar from '../components/Navbar/Navbar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerItem: {
    color: theme.palette.secondary.main,
    padding: `0 0 ${theme.spacing(2)}px 0`
  },
  subHeaderItem: {
    color: theme.palette.secondary.contrastText,
    padding: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    '& > div': {
      marginBottom: theme.spacing(0),
      marginTop: theme.spacing(0)
    },
    '& label.Mui-focused, label': {
      color: theme.palette.secondary.main,
    },
    '& label.MuiInputLabel-shrink': {
      transform: 'translate(14px, -15px) scale(0.75)'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.grey[300]
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey[400]
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey[500]
      },
      '& input': {
        color: theme.palette.secondary.main
      }
    }
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    fontSize: 14,
    fontWeight: 600,
    padding: theme.spacing(1),
    minWidth: '120px',
    maxWidth: '150px',
    float: 'right',
    textTransform: 'inherit'
  },
  remember: {
    margin: theme.spacing(0),
    '& .MuiCheckbox-colorPrimary': {
      padding: theme.spacing(0, 1, 0, 1),
      color: `${theme.palette.secondary.main}!important`
    },
    '& .MuiTypography-body1': {
      fontSize: 14,
      color: `${theme.palette.secondary.main}!important`
    }
  },
  submitRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
}));

const validators = getValidators({
  username: [isRequired],
  password: [isRequired]
});

const SignIn = () => {
  const classes = useStyles();
  const login = useAction(fetchLoginAction);
  const loc = getLocation();

  const { payload: user, isFetching } = useSelector(meSelector);
  const onSubmit = ({ username, password }) => {
    login(username, password);
  };

  if (user) {
    return <Redirect to={loc.Dashboard()} />;
  } else {
    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <Container
            component="main"
            maxWidth="xs"
          >
            <div className={classes.header}>
              <Typography
                className={classes.headerItem}
                component="h1"
                variant="h3"
              >
                Авторизация
              </Typography>
            </div>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                >
                  <String
                    autoComplete="username"
                    fullWidth
                    label="Логин"
                    margin="dense"
                    name="username"
                  />
                  <String
                    autoComplete="current-password"
                    fullWidth
                    label="Пароль"
                    margin="dense"
                    name="password"
                    type="password"
                  />
                  <Checkbox
                    className={classes.remember}
                    items={[{title: 'Запомнить меня', value: false}]}
                    margin="dense"
                    name="remember"
                  />
                  <div className={classes.submitRow}>
                    <Button
                      className={classes.submit}
                      color="secondary"
                      disabled={isFetching}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Войти
                    </Button>
                  </div>
                </form>
              )}
              validate={validators}
            />
          </Container>
        </div>
      </div>
    );
  }
};

export default SignIn;
