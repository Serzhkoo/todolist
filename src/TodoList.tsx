import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableTitle} from "./EditableTitle";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, TaskType} from "./state/tasks-reducer";
import {FilterValuesType} from "./state/todolists-reducer";
import {Task} from "./Task";

type PropsType = {
    todoListId: string
    title: string
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    console.log('TodoList called');

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasksObj[props.todoListId]);

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todoListId, "all"), [props]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todoListId, "active"), [props]);
    const onCompletedHandler = useCallback(() => props.changeFilter(props.todoListId, "completed"), [props]);
    const removeTodoList = () => props.removeTodoList(props.todoListId);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todoListId));
    }, [dispatch, props.todoListId]);

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.todoListId, title)
    }, [props]);

    let tasksForTodoList = tasks;

    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true);
    }
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false);
    }

    return (
        <div>
            <h3><EditableTitle title={props.title}
                               onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ol>
                {
                    tasksForTodoList.map(task => <Task key={task.taskId}
                                                       todoListId={props.todoListId}
                                                       taskId={task.taskId}
                    />)
                }
            </ol>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    )
});

