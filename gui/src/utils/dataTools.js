export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const uniqueFromTwoArrays = (arr1, arr2) => {
  const arr = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr.indexOf(arr1[i]) === -1) {
      arr.push(arr1[i]);
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    if (arr.indexOf(arr2[i]) === -1) {
      arr.push(arr2[i]);
    }
  }
  return arr;
};

export const normalizeData = data => {
  const o = {};
  const m = [];
  for (let c = 0; c < data.length; c++) {
    const val = data[c];
    m.push(val.id);
    o[val.id] = val;
  }
  return { o, m };
};
