import {Typography} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

export const getMenuItem = (name, title, icon, loc, history, classes) => {
  const current = loc[`is${name}`]()
  const other = current ? {} : {
    href: () => {
      history.push(loc[name]());
    }
  }

  return {
    title: (
      <Typography
        className={clsx(!current ? classes.activeMenuItem : classes.menuItem )}
      >
        {title}
      </Typography>
    ),
    icon: icon(),
    key: title,
    ...other
  };
};
