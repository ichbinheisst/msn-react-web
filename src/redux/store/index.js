import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import login from '../reducers/login';
import {localStorage} from '../middleware/localStorage';
import contacts from '../reducers/contacts';
import searchNewContact from '../reducers/searchNewContact';
import notification from '../reducers/notification';
import socket from '../reducers/socket';
const reducer = combineReducers ({login, contacts,searchNewContact,notification,socket});
const middleware = [...getDefaultMiddleware (), localStorage];
export const store = configureStore ({reducer, middleware});
