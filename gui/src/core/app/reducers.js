import * as CONSTS from './consts';

const initialState = {
  isLoaded: false
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  case CONSTS.APP_LOADED:
    return {
      ...state,
      isLoaded: true
    };
  default:
    return state;
  }
};

export default {
  [CONSTS.DOMAIN]: reducers
};
