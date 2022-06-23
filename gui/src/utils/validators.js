import { isNaN, isUndefined } from './tools';

const getMinValidator = min => value => {
  const _value = parseFloat(value);
  if (_value < min) {
    return `Value must be greater or equal ${min}`;
  }
};

const isNumber = value => {
  const _value = parseFloat(value);
  if (!isUndefined(value) && isNaN(_value)) {
    return 'Value must be number';
  }
};

const isRequired = value => {
  if (isUndefined(value)) {
    return 'Required value';
  }
};

function isEmail(val) {
  let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!regEmail.test(val)){
    return 'Invalid Email';
  }
}

const getValidators = validators => params => {
  const errors = {};
  Object.keys(validators).forEach(key => {
    const _validators = validators[key];
    if (_validators) {
      const fieldErrors = _validators
        .map(func => func(params[key]))
        .filter(Boolean);
      if (fieldErrors.length) errors[key] = fieldErrors.join('. ');
    }
  });
  return errors;
};

export { getMinValidator, getValidators, isNumber, isRequired, isEmail};
