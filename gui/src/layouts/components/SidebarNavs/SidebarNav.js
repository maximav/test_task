import React from 'react';
import PropTypes from 'prop-types';
import {useStyles} from './styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {getMenuItem} from './utils';
import {getLocation} from '../../../Routes';
import {useHistory} from 'react-router';
import DashboardIcon from '@material-ui/icons/Dashboard';
import clsx from 'clsx';


const SidebarNav = props => {
  const { className, ...rest } = props;
  const {t} = useTranslation();
  const loc = getLocation();
  const classes = useStyles();
  const history = useHistory();

  const publicPages = [
    getMenuItem('Dashboard', t('dashboard'), props => (
      <DashboardIcon
        className={classes.iconItem}
        {...props}
      />
    ), loc, history, classes)
  ];


  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {publicPages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.key}
          onClick={page.href}
        >
          <ListItemIcon className={classes.listItem}>{page.icon}</ListItemIcon>
          <ListItemText className={classes.listText}>{page.title}</ListItemText>
        </ListItem>
      ))}

    </List>
  );

};

SidebarNav.propTypes = {
  className: PropTypes.string
};

export default SidebarNav;
