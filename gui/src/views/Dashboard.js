import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import UploadFiles from '../components/UploadFiles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  raw: {
    margin: theme.spacing(2)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={1}
      >
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
        >
          <div className={classes.raw}>
            <UploadFiles />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
