import {combineReducers} from 'redux';
import {profileSlice} from './profile/profileSlice';
import {dialogsSlice} from './dialogs/dialogsSlice';
import {sidebarSlice} from './sidebar/sidebarSlice';
import {usersSlice} from './users/usersSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {authSlice} from './auth/authSlice';

const rootReducer = combineReducers({
    profilePage: profileSlice.reducer,
    dialogs: dialogsSlice.reducer,
    sidebar: sidebarSlice.reducer,
    usersPage: usersSlice.reducer,
    auth: authSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;