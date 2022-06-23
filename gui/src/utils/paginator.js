const calcPaginator = (page, count, perPage) => {
  return {
    pages: parseInt(count / perPage) + (count % perPage ? 1 : 0),
    start: perPage * (page - 1),
    end: perPage * page
  };
};

export default calcPaginator;

export const getListPayload = ({ count = 0, page_size = 0, results = [] }) => ({
  count,
  pageSize: page_size,
  items: results
});
