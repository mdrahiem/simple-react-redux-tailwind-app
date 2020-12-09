import {call, put} from 'redux-saga/effects';
import _ from 'lodash';
import axios from '../services/axios';
import actions from '../actions/actionTypes';

const baseURL = 'https://reqres.in/api';

export default function* sendRequest(action) {
  let absUrl = `${baseURL}/${action.payload.endpoint}`;
  let key = `${action.payload.endpoint}.${action.method}`;
  let ajaxConfig = {
    method: action.method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      'access-control-allow-origin': '*'
    },
    url: absUrl,
  };
  if (action.payload.appendToEndpoint) {
    ajaxConfig.url += action.payload.appendToEndpoint;
  }
  if (action.payload.params) {
    ajaxConfig.params = action.payload.params
  }
  if (action.payload.data) {
    ajaxConfig.data = action.payload.data
  }
  let isFetchingKey = `${key}.isFetching`;
  let responseKey = `${key}.response`;
  if (action.payload.keySuffix) {
    isFetchingKey = `${isFetchingKey}.${action.payload.keySuffix}`
    responseKey = `${responseKey}.${action.payload.keySuffix}`
  }
  yield put({
    type: actions.SET_IN_REDUX,
    payload: {
      path: isFetchingKey.split('.'),
      data: true
    }
  });
  try {
    let response = yield call(axios, ajaxConfig);
    if (_.isArray(response.data) && action.payload.keySuffix) {
      _.forEach(response.data, v => {
        v.keySuffix = action.payload.keySuffix;
      })
    }
    if (_.isArray(response.data) && action.payload.attachToResponse) {
      _.forEach(response.data, v => {
        v.requestInfo = action.payload.attachToResponse;
      })
    }
    if (_.isObject(response.data) && action.payload.keySuffix) {
      response.data.keySuffix = action.payload.keySuffix;
    }
    if (_.isObject(response.data) && action.payload.attachToResponse) {
      response.data.requestInfo = action.payload.attachToResponse;
    }
    yield put({
      type: actions.SET_IN_REDUX,
      payload: {
        path: responseKey.split('.'),
        data: response.data
      }
    });
    if (action.payload.subsequentAction) {
      yield put(action.payload.subsequentAction);
    }
  } catch (e) {
    console.log(e, 'errrrrrrrrrrrrrrrrrrr');
  } finally {
    yield put({
      type: actions.SET_IN_REDUX,
      payload: {
        path: isFetchingKey.split('.'),
        data: false
      }
    });
  }
}
