import { Provider } from 'react-redux';
import React from 'react';
import { combineReducers } from 'redux';
import { todoListsReducer } from '../state/todolists-reducer';
import { tasksReducer } from '../state/tasks-reducer';
import { v1 } from 'uuid';
import { AppRootStateType } from '../app/store';
import { appReducer } from '../app/app-reducer';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from '../features/Login/auth-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasksObj: tasksReducer,
  app: appReducer,
  auth: authReducer
});

const initialGlobalStore: AppRootStateType = {
  todoLists: [
    { id: 'todoListId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
    { id: 'todoListId2', title: 'What to buy', filter: 'all', entityStatus: 'loading', addedDate: '', order: 0 }
  ],
  tasksObj: {
    'todoListId1': [
      {
        description: '',
        title: '1',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      },
      {
        description: '',
        title: '2',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: 'todoListId1',
        order: 0,
        addedDate: ''
      }
    ],
    'todoListId2': [
      {
        description: '',
        title: '1',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      },
      {
        description: '',
        title: '2',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: 'todoListId2',
        order: 0,
        addedDate: ''
      }
    ]
  },
  app: {
    status: 'succeeded',
    error: null,
    isInitialized: true
  },
  auth: {
    isLoggedIn: true
  }
};

const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalStore,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};

export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => {
  return <HashRouter>{storyFn()}</HashRouter>;
};
