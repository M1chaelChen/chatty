import { createStore, combineReducers } from 'redux';
import { navigationReducer } from './navigation';

const reducers = combineReducers({
  nav: navigationReducer,
});

const store = createStore(
  reducers,
);

export default store;
