import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../../../app/store';
import { removeTaskTC, updateTaskTC } from '../../../../state/tasks-reducer';
import { Checkbox, IconButton } from '@material-ui/core';
import { EditableTitle } from '../../../../components/EditableTitle/EditableTitle';
import { Delete } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { TaskStatuses, TaskType } from '../../../../api/todolists-api';

export type TaskPropsType = {
  todoListId: string
  taskId: string
}
export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const task = useSelector<AppRootStateType, TaskType>(state => {
    const tasks = state.tasksObj[props.todoListId];
    return tasks.find(task => task.id === props.taskId) as TaskType;
  });

  const onRemoveHandler = () => dispatch(removeTaskTC(props.todoListId, task.id));
  const onChangeStatusHandler = () => {
    const status: TaskStatuses = task.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed;
    dispatch(updateTaskTC(props.todoListId, task.id, { status }));
  };
  const onChangeTitleHandler = useCallback((title: string) => {
    dispatch(updateTaskTC(props.todoListId, task.id, { title }));
  }, [dispatch, props.todoListId, task.id]);

  return (
    <li key={task.id}>
      <Checkbox onChange={onChangeStatusHandler}
                checked={task.status === TaskStatuses.Completed}
                color={'primary'}/>
      <EditableTitle title={task.title}
                     onChange={onChangeTitleHandler}/>
      <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
    </li>
  );
});