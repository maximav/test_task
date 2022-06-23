import {select} from '@redux-saga/core/effects';
import lodash from 'lodash';
import {successSaga} from './fetch';

export const editList = function* (_items, selector, updateAction) {
  const state = yield select(selector);
  let items = state.items || [];
  const result = items.slice();
  for (let i = 0; i < _items.length; i++) {
    const item = _items[i];
    const itemIndex = lodash.findIndex(items, {id: item.id});
    if (itemIndex === -1) {
      result.push(item);
    } else {
      result[itemIndex] = item;
    }
  }

  console.log('result', result, selector)

  yield successSaga(updateAction([...result]));
}