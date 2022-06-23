import {createAction} from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';

import * as CONSTS from './consts';
import {get, isUndefined} from '../../utils/tools';

const fetchReducer = (state = CONSTS.INITIAL_FETCH_STATE, action) => {
  switch (action.type) {
  case CONSTS.STARTED:
    return {
      ...state,
      isFetching: true,
      isFetched: false
    };
  case CONSTS.SUCCESS:
    return {
      ...state,
      isFetching: false,
      isFetched: true,
      payload: action.payload,
      error: null
    };
  case CONSTS.FAILURE:
    return {
      ...state,
      isFetching: false,
      isFetched: true,
      error: action.payload
    };
  case CONSTS.CLEAR:
    return CONSTS.INITIAL_FETCH_STATE;
  default:
    return state;
  }
};

export const getFetchReducer = reducerName => (state, action) => {
  const isInitializationCall = isUndefined(state);
  const actionName = get(action, 'meta.name');

  if (actionName !== reducerName && !isInitializationCall) return state;

  return fetchReducer(state, action);
};

export const getFetchActions = name => ({
  started: createAction(CONSTS.STARTED, undefined, () => ({
    name
  })),
  success: createAction(CONSTS.SUCCESS, undefined, () => ({
    name
  })),
  failure: createAction(CONSTS.FAILURE, undefined, () => ({
    name
  })),
  clear: createAction(CONSTS.CLEAR, undefined, () => ({
    name
  }))
});

export const getFetchSaga = ({
  type,
  apiMethod,
  handleSuccess,
  handleError
}) => {
  const { started, success, failure } = getFetchActions(type);

  return function*(action) {
    yield put(started());

    try {
      const response = yield call(apiMethod, action.payload);

      const handledData = handleSuccess
        ? yield handleSuccess(response, action.payload)
        : response.data;

      if (!isUndefined(handledData)) yield put(success(handledData));

      return handledData;
    } catch (error) {
      const handledError = handleError ? yield handleError(error) : error;

      if (handledError) yield put(failure(handledError));
    }
  };
};

export function* fetchSaga(config) {
  yield takeLatest(config.type, getFetchSaga(config));
}

export function* startedSaga(action) {
  const actions = getFetchActions(action.type);
  yield put(actions.started());
}

export function* successSaga(action) {
  const actions = getFetchActions(action.type);

  yield put(actions.success(action.payload));
}

export function* failureSaga(action) {
  const actions = getFetchActions(action.type);
  yield put(actions.failure(action.payload));
}

export function* clearSaga(action) {
  const actions = getFetchActions(action.type);
  yield put(actions.clear());
}

export const getDomainSelector = domains => state =>
  domains.reduce((acc, domain) => {
    if (typeof acc === 'object' && domain in acc) return acc[domain];

    return {};
  }, state);

export const getIsFetchingSelector = domains => state => {
  const instance = getDomainSelector(domains)(state);

  return instance.isFetching;
};

export const getIsFetchedSelector = domains => state => {
  const instance = getDomainSelector(domains)(state);
  return instance.isFetched;
};

export const getPayloadSelector = (domains, defaultValue) => state => {
  const instance = getDomainSelector(domains)(state);
  return instance.payload || defaultValue;
};

export const getErrorSelector = (domains, defaultValue) => state => {
  const instance = getDomainSelector(domains)(state);
  return instance.error || defaultValue;
};
export const simpleSaga = ({
  apiMethod,
  handleSuccess,
  handleError
}) => {
  return function* (action) {
    try {
      const response = yield call(apiMethod, action.payload);
      return handleSuccess
        ? yield handleSuccess(response, action.payload)
        : response.data;
    } catch (error) {
      return handleError ? yield handleError(error) : error;
    }
  }
};