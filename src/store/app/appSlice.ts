import {getAuthUserData} from '../authReducer';
import {useAppDispatch} from '../store';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const initializeApp = createAsyncThunk(
    'app/getAuthUserData',
    async (arg, thunkAPI) => {
        const dispatch = useAppDispatch()
        await dispatch(getAuthUserData())
        dispatch(appSlice.actions.initializedSuccess());
    }
)

interface appState {
    initialized: boolean,
}

const initialState: appState = {
    initialized: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        initializedSuccess(state) {
            state.initialized = true;
        }
    }
});

export const {initializedSuccess} = appSlice.actions;