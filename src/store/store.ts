import {Action, combineReducers} from 'redux';
import {profileSlice} from './profile/profileSlice';
import {dialogsSlice} from './dialogs/dialogsSlice';
import sidebarReducer from './sidebarReducer';
import {usersSlice} from './users/usersSlice';
import authReducer from './authReducer';
import {ThunkAction} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    profilePage: profileSlice.reducer,
    dialogs: dialogsSlice.reducer,
    sidebar: sidebarReducer,
    usersPage: usersSlice.reducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type BaseThunkType<AC extends Action> = ThunkAction<Promise<void>, RootState, undefined, AC>;