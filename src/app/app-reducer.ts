import { Dispatch } from 'redux';
import { authApi } from '../api/todolists-api';
import { setIsLoggedInAC } from '../features/Login/auth-reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppReducerType = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: AppReducerType = {
  status: 'idle',
  error: null,
  isInitialized: false
};

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    }
  }
});

export const appReducer = slice.reducer;
export const { setAppErrorAC, setAppStatusAC, setAppInitializedAC } = slice.actions;

export const initializeAppTC = () => {
  return (dispatch: Dispatch) => {
    authApi.me()
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(setIsLoggedInAC({ isLoggedIn: true }));
        } else {
          dispatch(setIsLoggedInAC({ isLoggedIn: false }));
        }
        dispatch(setAppInitializedAC({ isInitialized: true }));
      });
  };
};
