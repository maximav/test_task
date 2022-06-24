import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.common.white
  },
  item: {
    color: theme.palette.common.white,
    display: 'flex',
    padding: `${theme.spacing(1)} 0`,
    fontWeight: 'normal',
    fontSize: 16,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  icon: {
    color: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.common.white
    }
  },
  divider: {
    margin: theme.spacing(2, 0),
    backgroundColor: '#F0F3FA'
  },
  activeMenuItem: {
    color: theme.palette.primary.contrastText
  },
  menuItem: {
    color: theme.palette.info.main
  },
  iconItem: {
    width: 18,
    fill: theme.palette.secondary.main + '!important',
    strokeWidth: '0.2px',
    stroke: theme.palette.secondary.main + '!important'
  },
  listItem: {
    minWidth: theme.spacing(5),
    marginLeft: theme.spacing(1)
  },
  listText: {
    '& span': {
      whiteSpace: 'nowrap'
    }
  },
  iconLanguage: {
    width: 18
  },
  languageRoot: {
    marginBottom: theme.spacing(2)
  }
}));
