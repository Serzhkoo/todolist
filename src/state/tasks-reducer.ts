import { addTodoListAC, removeTodoListAC, setTodoListsAC } from './todolists-reducer';
import { Dispatch } from 'redux';
import { TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskType } from '../api/todolists-api';
import { AppRootStateType } from '../app/store';
import { setAppStatusAC } from '../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../helpers/error-helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TasksStateType = {
  [key: string]: TaskType[]
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string | null
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string | null
  deadline?: string | null
}

const initialState: TasksStateType = {} as TasksStateType;

const slice = createSlice({
  name: 'tasksObj',
  initialState: initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ taskId: string, todoListId: string }>) {
      const index = state[action.payload.todoListId].findIndex(task => task.id === action.payload.taskId);
      if (index > -1) {
        state[action.payload.todoListId].splice(index, 1);
      }
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId);
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.model};
      }
    },
    setTasksAC(state, action: PayloadAction<{ tasks: TaskType[], todoListId: string }>) {
      state[action.payload.todoListId] = action.payload.tasks;
    }
  },
  extraReducers(builder) {
    builder.addCase(addTodoListAC, (state, action) => {
      state[action.payload.newTodoList.id] = [];
    });
    builder.addCase(removeTodoListAC, (state, action) => {
      delete state[action.payload.todoListId];
    });
    builder.addCase(setTodoListsAC, (state, action) => {
      action.payload.todoLists.forEach(tl => {
        state[tl.id] = [];
      });
    });
  }
});

export const tasksReducer = slice.reducer;
export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } = slice.actions;

export const fetchTasksTC = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todoListsAPI.getTasks(todoListId)
      .then((response) => {
        dispatch(setTasksAC({ tasks: response.data.items, todoListId }));
        dispatch(setAppStatusAC({ status: 'succeeded' }));
      });
  };
};

export const removeTaskTC = (todoListId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todoListsAPI.deleteTask(todoListId, taskId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(removeTaskAC({ taskId, todoListId }));
        } else {
          handleServerAppError(response.data, dispatch);
        }
      });
  };
};

export const addTaskTC = (todoListId: string, taskTitle: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: 'loading' }));
    todoListsAPI.createTask(todoListId, taskTitle)
      .then((response) => {
        if (response.data.resultCode === 0) {
          const newTask: TaskType = response.data.data.item;
          dispatch(addTaskAC({ task: newTask }));
          dispatch(setAppStatusAC({ status: 'succeeded' }));
        } else {
          handleServerAppError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const updateTaskTC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTasks = getState().tasksObj[todoListId];
    const updatedTask = allTasks.find(t => t.id === taskId);

    if (updatedTask) {
      const apiModel: UpdateTaskType = {
        deadline: updatedTask.deadline,
        description: updatedTask.description,
        priority: updatedTask.priority,
        startDate: updatedTask.startDate,
        status: updatedTask.status,
        title: updatedTask.title,
        ...model
      };
      todoListsAPI.updateTask(todoListId, taskId, apiModel)
        .then((response) => {
          if (response.data.resultCode === 0) {
            const newTask: TaskType = response.data.data.item;
            dispatch(updateTaskAC({
              todoListId: newTask.todoListId,
              taskId: newTask.id,
              model
            }));
          } else {
            handleServerAppError(response.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };
};
