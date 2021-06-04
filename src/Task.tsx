import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableTitle} from "./EditableTitle";
import {Delete} from "@material-ui/icons";
import React, {useCallback} from "react";

type TaskPropsType = {
    todoListId: string
    taskId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const task = useSelector<AppRootStateType, TaskType>(state => {
        const tasks = state.tasksObj[props.todoListId];
        return tasks.find(task => task.taskId === props.taskId) as TaskType;
    });

    const onRemoveHandler = () => dispatch(removeTaskAC(task.taskId, props.todoListId));
    const onChangeStatusHandler = () => dispatch(changeTaskStatusAC(task.taskId, props.todoListId));
    const onChangeTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(task.taskId, props.todoListId, title))
    }, [dispatch, props.todoListId, task.taskId]);

    return (
        <li key={task.taskId}>
            <Checkbox onChange={onChangeStatusHandler}
                      checked={task.isDone}
                      color={"primary"}/>
            <EditableTitle title={task.title}
                           onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
        </li>
    )
})