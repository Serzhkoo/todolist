import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '363ff7c9-3edc-4bf1-8425-4941aa210b01'
  }
});

export type TodoListType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: D
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string | null
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskType = {
  title: string
  description: string | null
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export const todoListsAPI = {
  getTodoList() {
    return instance.get<TodoListType[]>('todo-lists');
  },
  createTodoList(todoListTitle: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', { title: todoListTitle });
  },
  deleteTodoList(todoListId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}`);
  },
  updateTodoList(todoListId: string, todoListTitle: string) {
    return instance.put<ResponseType<{ item: TodoListType }>>(`todo-lists/${todoListId}`, { title: todoListTitle });
  },
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`);
  },
  createTask(todoListId: string, taskTitle: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, { title: taskTitle });
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskType) {
    return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks/${taskId}`, model);
  }
};

export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('auth/login', data);
  },
  me() {
    return instance.get<ResponseType<{ id: number, login: string, email: string }>>(`auth/me`);
  },
  logout() {
    return instance.delete<ResponseType>('auth/login');
  }
};