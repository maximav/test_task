import fromPairs from 'lodash/fromPairs';

export { default as get } from 'lodash/get';
export { default as isUndefined } from 'lodash/isUndefined';
export { default as isNaN } from 'lodash/isNaN';
export { default as findIndex } from 'lodash/findIndex';
export { default as remove } from 'lodash/remove';
export { default as fromPairs } from 'lodash/fromPairs';
export { default as isNumber } from 'lodash/isNumber';
export { default as minBy } from 'lodash/minBy';
export { default as intersection } from 'lodash/intersection';

export const generatePassword = () => {
  return Math.random()
    .toString(36)
    .slice(-8);
};

export const objFilter = (obj, filter) => {
  return fromPairs(
    Object.keys(obj)
      .filter(i => filter(obj[i]))
      .map(i => [i, obj[i]])
  );
};

export function getStyles(val, selected, theme, multiple) {
  if (multiple) {
    return {
      fontWeight:
        selected.indexOf(val) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  } else {
    return {
      fontWeight:
        selected === val
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  }
}


export function cutElement(items, item) {
  return  items.map(function(el) { return el.id === item.id ? item : el; });
}