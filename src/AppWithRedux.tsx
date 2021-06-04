import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    removeTodoListAC, TodoListType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

const AppWithRedux = () => {
    console.log('App called');

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists);

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId));
    },[dispatch]);

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title));
    }, [dispatch]);

    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListId, title));
    },[dispatch]);

    const changeFilter = useCallback ((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListId, value));
    },[dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                                return <Grid item key={tl.todoListId}>
                                    <Paper style={{padding: "10px"}} elevation={3}>
                                        <TodoList todoListId={tl.todoListId}
                                                  title={tl.title}
                                                  changeFilter={changeFilter}
                                                  filter={tl.filter}
                                                  removeTodoList={removeTodoList}
                                                  changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            }
                        )}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
