import React, { useCallback, useEffect } from 'react';
import './App.css';
import { AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { TodoListsList } from '../features/TodoListsList/TodoListsList';
import { ErrorBar } from '../components/ErrorBar/ErrorBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { AppReducerType, initializeAppTC } from './app-reducer';
import { Route } from 'react-router-dom';
import { Login } from '../features/Login/Login';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logoutTC } from '../features/Login/auth-reducer';

export type AppPropsType = {
  demo?: boolean
}

const App = ({ demo = false }: AppPropsType) => {
  const dispatch = useDispatch();
  const app = useSelector<AppRootStateType, AppReducerType>(state => state.app);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC());
    }
  }, [dispatch, demo]);

  const logOutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, [dispatch]);

  if (!app.isInitialized) {
    return (
      <Backdrop style={{ color: '#fff', backgroundColor: '#aac5f5' }} open={true}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    );
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Logout</Button>}
          </Typography>
        </Toolbar>
      </AppBar>
      {app.status === 'loading' ? <LinearProgress color='secondary'/> : <div style={{ height: '4px' }}></div>}
      <ErrorBar/>
      <Container fixed>
        <Route exact path={'/'} render={() => <TodoListsList demo={demo}/>}/>
        <Route path={'/login'} render={() => <Login/>}/>
      </Container>
    </div>
  );
};

export default App;
