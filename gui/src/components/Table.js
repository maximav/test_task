import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import DataTable from 'react-data-table-component';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

function buildColumns (items) {
  const columns = [];
  if (items.length > 0) {
    const item = items[0];
    Object.keys(item).forEach(key => {
      columns.push(
        {
          name: key,
          selector: row => row[key],
          sortable: true
        }
      )
    })
  }

  return columns;
}
function  buildData (items) {
  items.forEach(item => {
    Object.keys(item).forEach(key => {
      if (typeof item[key] === 'object') {
        item[key] = JSON.stringify(item[key])
      } else if (typeof item[key] === 'boolean') {
        item[key] = String(item[key])
      }
    })
  })
  return items;
}

const Table = ({items}) => {
  const classes = useStyles();

  const [columns, setColumns] = useState([]);
  const [raws, setRaws] = useState([]);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!rendered && items.length > 0){
      setColumns(buildColumns(items));
      setRaws(buildData(items));
      setRendered(true)
    }
  }, [columns, raws, items, rendered])
  
  return (
    <div className={classes.root}>
      <DataTable
        columns={columns}
        data={raws}
        pagination
      />
    </div>
  );
};

Table.propTypes = {
  items: PropTypes.array.isRequired
};

export default Table;