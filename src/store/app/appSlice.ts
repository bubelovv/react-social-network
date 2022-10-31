// import {actions, getAuthUserData} from '../authReducer';
// import {useAppDispatch} from '../store';
// import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {authApi} from '../../API/authApi';
// import {ThunkType} from '../profileReducer';

// export const initializeApp = (): ThunkType => async (dispatch) => {
//     await dispatch(getAuthUserData())
//     dispatch(appSlice.actions.initializedSuccess());
// };

// export const initializeApp = createAsyncThunk(
//     'app/getAuthUserData',
//     async (arg, thunkAPI) => {
//         const dispatch = useAppDispatch()
//         await dispatch(getAuthUserData())
//         appSlice.actions.initializedSuccess();
//     }
// )

// interface appState {
//     initialized: boolean,
// }
//
// const initialState: appState = {
//     initialized: false,
// };
//
// export const appSlice = createSlice({
//     name: 'app',
//     initialState: initialState,
//     reducers: {
//         initializedSuccess(state) {
//             state.initialized = true;
//         }
//     },
//     // extraReducers: {
//     //     [initializeApp.fulfilled.type]: (state, actions: PayloadAction) => {
//     //
//     //     }
//     // }
// });

// export const {initializedSuccess} = appSlice.actions;