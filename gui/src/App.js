import React, { Suspense, useEffect } from 'react';
import { history } from './commons';
import { Router } from 'react-router-dom';

import Routes from './Routes';

import { useAction } from './utils/hooks';
import { fetchMeAction } from './core/users/actions';

import { ThemeProvider } from '@material-ui/core';
import AlertMessage from './components/Alert/AlertMessage';
import HelmetWrapper from './layouts/HelmetWrapper';
import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B1635',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#d81c52',
      contrastText: '#ffffff'
    },
    info: {
      main: '#4D9AC8',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#323232'
    }
  },
  shape: {
    borderRadius: 6
  }
});

function App() {
  const fetchMe = useAction(fetchMeAction);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <HelmetWrapper />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes />
          <AlertMessage />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
