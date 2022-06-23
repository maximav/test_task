import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import calcPaginator from '../utils/paginator';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import clsx from 'clsx';

const useStyles = makeStyles(theme =>
  createStyles({
    paginator: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      fontSize: 12
    },
    title: {
      marginRight: theme.spacing(2),
      color: theme.palette.text.secondary,
      fontSize: 12
    },
    select: {
      borderBottom: '0 !important',
      '& .MuiSelect-select': {
        fontSize: 12
      },
      '&::before, &::after, &:hover::after': {
        borderBottom: '0 !important'
      }
    },
    paginatorBody: {
      '& > .MuiPagination-ul li:first-child': {
        border: `1px solid ${grey[300]}`,
        borderRadius: '5px 0px 0px 5px'
      },
      '& > .MuiPagination-ul li': {
        borderTop: `1px solid ${grey[300]}`,
        borderBottom: `1px solid ${grey[300]}`,
        borderRight: `1px solid ${grey[300]}`,
        minHeight: '26px',
        padding: '0'
      },
      '& > .MuiPagination-ul li:last-child': {
        borderTop: `1px solid ${grey[300]}`,
        borderBottom: `1px solid ${grey[300]}`,
        borderRight: `1px solid ${grey[300]}`,
        borderRadius: '0px 5px 5px 0px'
      },
      '& > .MuiPagination-ul li .MuiButtonBase-root': {
        borderRadius: 0,
        padding: theme.spacing(0.5),
        height: '32px',
        width: '32px',
        margin: 0,
        color: theme.palette.info.main
      },
      '& > .MuiPagination-ul li .MuiPaginationItem-ellipsis': {
        height: '32px',
        width: '32px',
        margin: 0,
        padding: '2px'
      },
      '& > .MuiPagination-ul li .Mui-selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.info.main + '!important',
        border: 'none',
      }
    }
  })
);

const Paginator = ({
  count,
  disabled,
  page,
  pageSize,
  pageSizes,
  setPageSize,
  setPage,
  className
}) => {
  const { pages } = calcPaginator(page, count, pageSize);
  const classes = useStyles();

  return (
    <div className={clsx(classes.paginator, className)}>
      <Typography className={classes.title}>Строк на странице:</Typography>
      <Select
        className={classes.select}
        onChange={event => {
          setPageSize(event.target.value);
        }}
        value={pageSize}
      >
        {pageSizes.map(i => (
          <MenuItem
            key={`pageSize-${i}`}
            value={i}
          >
            {i}
          </MenuItem>
        ))}
      </Select>
      {count > pageSize ? (
        <Pagination
          className={classes.paginatorBody}
          color="secondary"
          count={pages}
          disabled={disabled}
          onChange={(e, p) => setPage(p)}
          page={page}
          size="small"
        />
      ) : null}
    </div>
  );
};

Paginator.defaultProps = {
  disabled: false
};

Paginator.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizes: PropTypes.array.isRequired,
  setPage: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired
};

export default Paginator;
