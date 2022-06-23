import React from 'react';
import {Redirect, Route, useHistory} from 'react-router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { meSelector } from '../core/users/selectors';
import {getLocation} from '../Routes';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  const loc = getLocation();
  const history = useHistory();
  const { payload: user } = useSelector(meSelector);
  console.log('loc.SignIn()', loc.SignIn());
  if (user) {
    return (
      <Route
        {...rest}
        render={matchProps => {
          return <Layout
            isAdmin={user.is_staff}
            path={history.location.pathname}
          >
            <Component
              user={user}
              {...matchProps} />
          </Layout>
        }}
      />
    );
  } else {
    return <Redirect to={loc.SignIn()} />;
  }
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;