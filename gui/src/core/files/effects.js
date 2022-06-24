import {useAction, usePagination} from '../../utils/hooks';
import { fetchFiles } from './actions';
import { useSelector } from 'react-redux';
import { fileListSelector } from './selectors';
import { useEffect } from 'react';


export const useFiles = () => {
  const fetchList = useAction(fetchFiles);
  const selector = useSelector(fileListSelector);
  const isFetched = selector.isFetched;
  const [page, pageSize] = usePagination();
  useEffect(() => {
    if (!isFetched) {
      fetchList(page, pageSize);
    }
  }, [fetchList, isFetched, page, pageSize]);
  return selector;
};
