import React from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableTitle} from "./EditableTitle";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksType
} from "./state/tasks-reducer";
import {FilterValuesType} from "./state/todolists-reducer";

type PropsType = {
    id: string
    title: string
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export function TodoList(props: PropsType) {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasksObj[props.id]);

    const onAllClickHandler = () => props.changeFilter(props.id,"all");
    const onActiveClickHandler = () => props.changeFilter(props.id,"active");
    const onAllCompletedHandler = () => props.changeFilter(props.id,"completed");
    const removeTodoList = () => props.removeTodoList(props.id);

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id));
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    let tasksForTodoList = tasks;

    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
    }
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
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
                    tasksForTodoList.map(t => {

                        const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.id));
                        const onChangeStatusHandler = () => dispatch(changeTaskStatusAC(t.id, props.id));
                        const onChangeTitleHandler = (title: string) => dispatch(changeTaskTitleAC(t.id, props.id, title));

                        return (
                            <li key={t.id}>
                                <Checkbox onChange={onChangeStatusHandler}
                                          checked={t.isDone}
                                          color={"primary"}/>
                                <EditableTitle title={t.title}
                                               onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
                            </li>
                        )
                    })
                }
            </ol>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onAllCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

