import { v1 } from 'uuid';
import {
  changeTodoListEntityStatusAC,
  FilterValuesType,
  setTodoListsAC,
  TodoListDomainType
} from './todolists-reducer';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer
} from './todolists-reducer';
import { RequestStatusType } from '../app/app-reducer';

let todoListId1: string;
let todoListId2: string;
let startState: TodoListDomainType[] = [];

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();
  startState = [
    { id: todoListId1, title: 'What to learn', entityStatus: 'idle', filter: 'all', addedDate: '', order: 0 },
    { id: todoListId2, title: 'What to buy', entityStatus: 'idle', filter: 'all', addedDate: '', order: 0 }
  ];
});

test('correct todolist should be removed', () => {

  const endState = todoListsReducer(startState, removeTodoListAC({ todoListId: todoListId1 }));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => {

  const endState = todoListsReducer(startState, addTodoListAC({
    newTodoList: {
      id: 'todolistId3',
      title: 'What to do',
      addedDate: '',
      order: 0
    }
  }));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe('What to do');
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {

  let newTodolistTitle = 'New Todolist';

  const endState = todoListsReducer(startState, changeTodoListTitleAC({
    todoListId: todoListId2,
    todoListTitle: newTodolistTitle
  }));

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed';

  const endState = todoListsReducer(startState, changeTodoListFilterAC({
    todoListId: todoListId2,
    todoListFilter: newFilter
  }));

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {
  const action = setTodoListsAC({ todoLists: startState });

  const endState = todoListsReducer([], action);

  expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = 'loading';

  const endState = todoListsReducer(startState, changeTodoListEntityStatusAC({
    todoListId: todoListId2,
    entityStatus: newStatus
  }));

  expect(endState[0].entityStatus).toBe('idle');
  expect(endState[1].entityStatus).toBe(newStatus);
});