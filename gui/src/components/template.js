import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles( theme => ({
  root: {
    width: '100%',
    borderRadius: 7,
    minHeight: 230,
    border: '1px solid ' + theme.palette.grey[300]
  },
  container: {
    padding: theme.spacing(3)
  },
  header: {
    fontSize: 20,
    color: theme.palette.grey[600],
    padding: theme.spacing(1.5, 0, 1.5, 0)
  }
}))

const Template = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.header}>
          Template
        </div>


      </div>
    </div>
  );
}

Template.propTypes = {};

export default Template;