import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import UploadFiles from '../components/UploadFiles';
import {useFiles} from '../core/files/effects';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

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
  const files = useFiles();

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
          <UploadFiles />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
        >
          <Table
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  Id
                </TableCell>
                <TableCell>
                Имя файла
                </TableCell>
                <TableCell>
                Расширение
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.items && files.items.length
                ? files.items.map(item => (
                  <TableRow
                    key={Math.random()
                      .toString(36)
                      .substring(3)}
                  >
                    <TableCell
                      padding="checkbox"
                    >
                      {item.id}
                    </TableCell>
                    <TableCell>
                      {item && item.name}
                    </TableCell>
                    <TableCell>
                      {item && item.extension}
                    </TableCell>
                  </TableRow>
                ))
                : null}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
