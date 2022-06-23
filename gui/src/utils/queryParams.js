import qs from 'query-string';

export const getModal = (history, param) => {
  const paramName = param || 'modalOpen';
  const query = qs.parse(history.location.search);
  const open = query[paramName] === 'true';
  const toggle = () => {
    if (open) {
      return { ...query, [paramName]: undefined };
    } else {
      return { ...query, [paramName]: 'true' };
    }
  };
  return [
    open,
    () =>
      history.push({
        pathname: history.location.pathname,
        search: qs.stringify(toggle())
      })
  ];
};
