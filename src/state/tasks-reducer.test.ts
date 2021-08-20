import { addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC } from './tasks-reducer';
import { TasksStateType } from './tasks-reducer.js';
import { addTodoListAC, removeTodoListAC, setTodoListsAC } from './todolists-reducer';
import { TaskStatuses } from '../api/todolists-api';

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    'todolistId1': [
      {
        description: 'bla',
        title: 'JS',
        status: 0,
        priority: 0,
        startDate: '01-01-2021',
        deadline: '01-02-2021',
        id: '1',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '31-12-2020'
      },
      {
        description: 'bla-bla',
        title: 'React',
        status: 2,
        priority: 0,
        startDate: '01-02-2021',
        deadline: '01-03-2021',
        id: '2',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '01-01-2021'
      },
      {
        description: 'bla-bla-bla',
        title: 'Redux',
        status: 0,
        priority: 0,
        startDate: '01-03-2021',
        deadline: '01-04-2021',
        id: '3',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '01-02-2021'
      }
    ],
    'todolistId2': [
      {
        description: 'bla',
        title: 'bread',
        status: 0,
        priority: 0,
        startDate: '01-01-2021',
        deadline: '01-02-2021',
        id: '1',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '31-12-2020'
      },
      {
        description: 'bla-bla',
        title: 'milk',
        status: 2,
        priority: 0,
        startDate: '01-02-2021',
        deadline: '01-03-2021',
        id: '2',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '01-01-2021'
      },
      {
        description: 'bla-bla-bla',
        title: 'tea',
        status: 0,
        priority: 0,
        startDate: '01-03-2021',
        deadline: '01-04-2021',
        id: '3',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '01-02-2021'
      }
    ]
  };
});

test('correct task should be deleted from correct array', () => {

  const action = removeTaskAC({ todoListId: 'todolistId2', taskId: '2' });

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    'todolistId1': [
      {
        description: 'bla',
        title: 'JS',
        status: 0,
        priority: 0,
        startDate: '01-01-2021',
        deadline: '01-02-2021',
        id: '1',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '31-12-2020'
      },
      {
        description: 'bla-bla',
        title: 'React',
        status: 2,
        priority: 0,
        startDate: '01-02-2021',
        deadline: '01-03-2021',
        id: '2',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '01-01-2021'
      },
      {
        description: 'bla-bla-bla',
        title: 'Redux',
        status: 0,
        priority: 0,
        startDate: '01-03-2021',
        deadline: '01-04-2021',
        id: '3',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '01-02-2021'
      }
    ],
    'todolistId2': [
      {
        description: 'bla',
        title: 'bread',
        status: 0,
        priority: 0,
        startDate: '01-01-2021',
        deadline: '01-02-2021',
        id: '1',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '31-12-2020'
      },
      {
        description: 'bla-bla-bla',
        title: 'tea',
        status: 0,
        priority: 0,
        startDate: '01-03-2021',
        deadline: '01-04-2021',
        id: '3',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '01-02-2021'
      }
    ]
  });
  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(2);
  expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
});

test('correct task should be added to correct array', () => {

  const action = addTaskAC({
    task: {
      description: '',
      title: '2',
      status: 0,
      priority: 0,
      startDate: '',
      deadline: '',
      id: '4',
      todoListId: 'todolistId2',
      order: 0,
      addedDate: ''
    }
  });

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('2');
  expect(endState['todolistId2'][0].status).toBe(0);
});

test('status of specified task should be changed', () => {

  const action = updateTaskAC({ todoListId: 'todolistId2', taskId: '2', model: { status: TaskStatuses.New } });

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'][1].status).toBe(2);
  expect(endState['todolistId2'][1].status).toBe(0);
});

test('title of specified task should be changed', () => {

  const action = updateTaskAC({ todoListId: 'todolistId2', taskId: '2', model: { title: 'juce' } });

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'][1].title).toBe('React');
  expect(endState['todolistId2'][1].title).toBe('juce');
});

test('new array should be added when new todolist is added', () => {

  const action = addTodoListAC({
    newTodoList: {
      id: 'todolistId3',
      title: 'What to do',
      addedDate: '',
      order: 0
    }
  });

  const endState = tasksReducer(startState, action);


  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

  const action = removeTodoListAC({ todoListId: 'todolistId2' });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).toBeUndefined();
});

test('empty arrays should be added when todolists set', () => {

  const action = setTodoListsAC({
    todoLists: [
      { id: '1', title: 'What to learn', addedDate: '', order: 0 },
      { id: '2', title: 'What to buy', addedDate: '', order: 0 }
    ]
  });

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState['1']).toStrictEqual([]);
  expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added to todolist', () => {

  const action = setTasksAC({ tasks: startState['todolistId2'], todoListId: 'todolistId2' });

  const endState = tasksReducer({
    'todolistId1': [],
    'todolistId2': []
  }, action);

  expect(endState['todolistId2'].length).toBe(3);
  expect(endState['todolistId1'].length).toBe(0);
});