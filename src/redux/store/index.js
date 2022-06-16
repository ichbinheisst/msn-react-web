import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import login from '../reducers/login';
import {localStorage} from '../middleware/localStorage';
import contacts from '../reducers/contacts';
import searchNewContact from '../reducers/searchNewContact';
const reducer = combineReducers ({login, contacts,searchNewContact});
const middleware = [...getDefaultMiddleware (), localStorage];
export const store = configureStore ({reducer, middleware});
