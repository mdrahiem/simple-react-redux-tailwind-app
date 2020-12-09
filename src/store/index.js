import { createStore, applyMiddleware } from "redux";
// import createSagaMiddleware from 'redux-saga';
import mainReducer from "../reducers";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
// import rootSaga from '../sagas';
import { Map } from 'immutable';
import thunk from "redux-thunk";


const middlewares = [thunk];

const initialState = new Map({});

// const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  mainReducer,
  // initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
  // composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// sagaMiddleware.run(rootSaga);

export default store;
