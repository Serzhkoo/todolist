import React, { useCallback, useEffect } from 'react';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableTitle } from '../../../components/EditableTitle/EditableTitle';
import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../../app/store';
import { addTaskTC, fetchTasksTC } from '../../../state/tasks-reducer';
import { FilterValuesType } from '../../../state/todolists-reducer';
import { Task } from './Task/Task';
import { TaskStatuses, TaskType } from '../../../api/todolists-api';
import { RequestStatusType } from '../../../app/app-reducer';

type PropsType = {
  todoListId: string
  title: string
  changeFilter: (todoListId: string, todoListFilter: FilterValuesType) => void
  filter: FilterValuesType
  entityStatus: RequestStatusType
  removeTodoList: (todoListId: string) => void
  changeTodoListTitle: (todoListId: string, title: string) => void
  demo?: boolean
}

export const TodoList = React.memo(({ demo = false, ...props }: PropsType) => {
  console.log('TodoList called');
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasksObj[props.todoListId]);

  useEffect(() => {
    if (demo) {
      return
    }
    dispatch(fetchTasksTC(props.todoListId));
  }, [dispatch, props.todoListId, demo]);

  const onAllClickHandler = useCallback(() => props.changeFilter(props.todoListId, 'all'), [props]);
  const onActiveClickHandler = useCallback(() => props.changeFilter(props.todoListId, 'active'), [props]);
  const onCompletedHandler = useCallback(() => props.changeFilter(props.todoListId, 'completed'), [props]);
  const removeTodoList = () => props.removeTodoList(props.todoListId);

  const addTask = useCallback((title: string) => {
    dispatch(addTaskTC(props.todoListId, title));
  }, [dispatch, props.todoListId]);

  const changeTodoListTitle = useCallback((title: string) => {
    props.changeTodoListTitle(props.todoListId, title);
  }, [props]);

  let tasksForTodoList = tasks;

  if (props.filter === 'completed') {
    tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.Completed);
  }
  if (props.filter === 'active') {
    tasksForTodoList = tasksForTodoList.filter(task => task.status === TaskStatuses.New);
  }

  return (
    <div>
      <h3><EditableTitle title={props.title}
                         onChange={changeTodoListTitle}/>
        <IconButton onClick={removeTodoList} disabled={props.entityStatus === 'loading'}><Delete/></IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
      <ol>
        {
          tasksForTodoList.map(task => <Task key={task.id}
                                             todoListId={props.todoListId}
                                             taskId={task.id}
          />)
        }
      </ol>
      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
        </Button>
        <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                onClick={onActiveClickHandler}>Active
        </Button>
        <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                onClick={onCompletedHandler}>Completed
        </Button>
      </div>
    </div>
  );
});

