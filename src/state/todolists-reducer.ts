import { Dispatch } from 'redux';
import { todoListsAPI, TodoListType } from '../api/todolists-api';
import { RequestStatusType, setAppStatusAC } from '../app/app-reducer';
import { handleServerNetworkError } from '../helpers/error-helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const initialState: TodoListDomainType[] = [] as TodoListDomainType[];

const slice = createSlice({
  name: 'todoLists',
  initialState: initialState,
  reducers: {
    removeTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    addTodoListAC(state, action: PayloadAction<{ newTodoList: TodoListType }>) {
      state.unshift({ ...action.payload.newTodoList, filter: 'all', entityStatus: 'idle' });
    },
    changeTodoListTitleAC(state, action: PayloadAction<{ todoListId: string, todoListTitle: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId);
      if (index > -1) {
        state[index].title = action.payload.todoListTitle;
      }
    },
    changeTodoListFilterAC(state, action: PayloadAction<{ todoListId: string, todoListFilter: FilterValuesType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId);
      if (index > -1) {
        state[index].filter = action.payload.todoListFilter;
      }
    },
    changeTodoListEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId);
      if (index > -1) {
        state[index].entityStatus = action.payload.entityStatus;
      }
    },
    setTodoListsAC(state, action: PayloadAction<{ todoLists: TodoListType[] }>) {
      return action.payload.todoLists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
    }
  }
});

export const todoListsReducer = slice.reducer;
export const { removeTodoListAC, addTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC, changeTodoListEntityStatusAC, setTodoListsAC } = slice.actions;

export const fetchTodoListsTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todoListsAPI.getTodoList()
      .then((response) => {
        dispatch(setTodoListsAC({ todoLists: response.data }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const removeTodoListTC = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    dispatch(changeTodoListEntityStatusAC({ todoListId, entityStatus: 'loading' }));
    todoListsAPI.deleteTodoList(todoListId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(removeTodoListAC({ todoListId }));
          dispatch(setAppStatusAC({ status: 'succeeded' }));
        }
      });
  };
};

export const addTodoListTC = (todoListTitle: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todoListsAPI.createTodoList(todoListTitle)
      .then((response) => {
        const newTodoList: TodoListType = response.data.data.item;
        dispatch(addTodoListAC({ newTodoList }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      });
  };
};

export const changeTodoListTitleTC = (todoListId: string, newTitle: string) => {
  return (dispatch: Dispatch) => {
    todoListsAPI.updateTodoList(todoListId, newTitle)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(changeTodoListTitleAC({ todoListId, todoListTitle: newTitle }));
        }
      });
  };
};