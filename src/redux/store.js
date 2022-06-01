import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import initialState from './initalState';
import tablesReducer from './tablesRedux';

const subreducers = {
  tables: tablesReducer,
};

const reducer = combineReducers(subreducers);
const store = configureStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
