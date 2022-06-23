import React from 'react';
import { Switch, Route} from 'react-router-dom';

import RouteWithLayout from './components/RouteWithLayout'
import Main from './layouts/Main'
import {Redirect} from 'react-router';
const NotFound = React.lazy(() => import('./views/NotFound'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const MainPage = React.lazy(() => import('./views/Main/Main'));
const SignIn = React.lazy(() => import('./views/SignIn'));
const SignUp = React.lazy(() => import('./views/SignUp'));

const ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/not-found',

  MAIN: '/'
};

const getLocation = () => {
  const loc = window.location.pathname;
  return {
    current: () => loc,
    main: () => ROUTES.MAIN,
    SignIn: () => ROUTES.SIGN_IN,
    SignUp: () => ROUTES.SIGN_UP,
    Dashboard: () => ROUTES.DASHBOARD,
    isDashboard: () => ROUTES.DASHBOARD === loc,

    NotFound: () => ROUTES.NOT_FOUND

  };
};

const Routes = () => {
  return (
    <Switch>

      <Route
        component={SignIn}
        exact
        path={ROUTES.SIGN_IN}
      />
      <Route
        component={SignUp}
        exact
        path={ROUTES.SIGN_UP}
      />
      <Route
        component={NotFound}
        exact
        path={ROUTES.NOT_FOUND}
      />
      <Route
        component={MainPage}
        exact
        path={ROUTES.MAIN}
      />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={Main}
        path={ROUTES.DASHBOARD}
      />

      <Redirect to={ROUTES.NOT_FOUND} />
    </Switch>
  );
};

export default Routes;
export { getLocation };
