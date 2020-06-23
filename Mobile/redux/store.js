import {createStore} from 'redux';
import userReducer from './reducer';

const store = createStore(userReducer);

//store.subscribe(() => console.log(store.getState(), 'ASDASDASD'));

export default store;
