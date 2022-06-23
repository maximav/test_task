import { useCallback, useState } from 'react';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getModal } from './queryParams';
import {pageSizes} from '../const';
import { useMediaQuery } from 'react-responsive';

export const useAction = action => {
  const dispatch = useDispatch();

  return useCallback((...args) => dispatch(action(...args)), [
    dispatch,
    action
  ]);
};

export const usePagination = () => {
  const history = useHistory();
  const query = qs.parse(history.location.search);
  const page = parseInt(query.page || 1);
  const pageSize = parseInt(query.pageSize || pageSizes[0]);
  const changePagination = props => {
    if (props.page !== undefined) {
      query.page = props.page;
    }
    if (props.pageSize !== undefined) {
      query.pageSize = props.pageSize;
      delete query.page;
    }
    history.push({
      pathname: history.location.pathname,
      search: qs.stringify(query)
    });
  };
  return [page, pageSize, changePagination];
};

export const getPagination = (history) => {
  const query = qs.parse(history.location.search);
  const page = parseInt(query.page || 1);
  const pageSize = parseInt(query.pageSize || pageSizes[0]);
  return [page, pageSize]
}

export const useUserId = () => {
  const history = useHistory();
  const query = qs.parse(history.location.search);
  return parseInt(query.userId) || undefined;
};

export const getUserId = (history) => {
  const query = qs.parse(history.location.search);
  return parseInt(query.userId) || undefined;
};

export const useModal = param => {
  const history = useHistory();
  return getModal(history, param);
};

export const useModalState = () => {
  const [open, setOpen] = useState(false);
  return [
    open,
    () => {
      setOpen(!open);
    }
  ];
};

export const useFilter = filterName => {
  const history = useHistory();
  const query = qs.parse(history.location.search);
  const val = query[filterName] || null;
  const changeFilter = props => {
    if (props && props !== 0) {
      query[filterName] = props;
    } else if (props === 0) {
      delete query[filterName];
    }
    history.push({
      pathname: history.location.pathname,
      search: qs.stringify(query)
    });
  };
  return [val, changeFilter];
};

export const useResponsive = () => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isIPhone5SE = useMediaQuery({ maxWidth: 321 });
  return { isDesktop, isTablet, isMobile, isIPhone5SE};
}