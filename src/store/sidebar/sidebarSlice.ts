import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {InitialStateSidebar} from './types';
import {IGetUsersResponse, usersApi} from '../../API/usersApi';
import {IGetUsersRequest} from '../users/types';

export const getFriends = createAsyncThunk<IGetUsersResponse, IGetUsersRequest>(
    'sidebar.getFriends',
    async (args, {rejectWithValue}) => {
        const response = await usersApi.getUsers(args.currentPage, args.pageSize, args.term, args.friend)
        if (response.status !== 200) {
            return rejectWithValue('Can\'t get friends. Server Error');
        }
        return response.data;
    }
)

const initialState: InitialStateSidebar = {
    friends: [

    ],
};

export const sidebarSlice = createSlice({
        name: 'sidebar',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder
                .addCase(getFriends.fulfilled, (state, action) => {
                    state.friends = action.payload.items
                })
        }
    }
);