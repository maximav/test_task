const css = {
  drawerWidth: 240,
  drawerClosedWidth: 64,
  drawerBorderWidth: 1,
  topBarHeight: 72,
  bottomBarHeight: 36,
  tableHeaderSize: 72,
  tableFooterSize: 64,
  chevronSize: 24
};

const pageSizes = [10, 20, 50, 100];

export { css, pageSizes };
export const apiPrefix = '/api/v1';

export const TASK_TYPES = [
  [10, 'Загрузка'],
  [20, 'Перемещение'],
  [30, 'Извлечение'],
];
