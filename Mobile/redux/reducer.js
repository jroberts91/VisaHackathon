import {combineReducers} from 'redux';

import {ADD_USER} from './actions';

const merge = (prev, next) => Object.assign({}, prev, next);

const userReducer = (state = [], action) => {
  if (action.type === ADD_USER) {
    return [...state, action.payload];
  }
  return state;
};

const reducer = combineReducers({users: userReducer});

export default reducer;
