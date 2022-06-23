import React from 'react';
import {getLocation} from '../../Routes';
import {Redirect} from 'react-router';

const Main = () => {

  const loc = getLocation();

  return <Redirect to={loc.SignIn()} />;
};

export default Main;
