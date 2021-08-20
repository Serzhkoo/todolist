import { tasksReducer, TasksStateType } from './tasks-reducer';
import { addTodoListAC, todoListsReducer, TodoListDomainType } from './todolists-reducer';

test('it\'s should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListDomainType> = [];
  const newTodoList = {
    id: 'todolistId3',
    title: 'What to do',
    addedDate: '',
    order: 0
  };

  const action = addTodoListAC({ newTodoList });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todoListsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.newTodoList.id);
  expect(idFromTodolists).toBe(action.payload.newTodoList.id);
});
