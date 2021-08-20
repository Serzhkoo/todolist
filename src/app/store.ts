import { combineReducers } from 'redux';
import { todoListsReducer } from '../state/todolists-reducer';
import { tasksReducer } from '../state/tasks-reducer';
import thunkMiddleware from 'redux-thunk';
import { appReducer } from './app-reducer';
import { authReducer } from '../features/Login/auth-reducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasksObj: tasksReducer,
  app: appReducer,
  auth: authReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

// @ts-ignore
window.store = store;