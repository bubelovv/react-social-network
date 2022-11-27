import {IGetUsersResponse, usersApi} from '../../API/usersApi';
import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IGetUsersRequest, InitialStateUsers} from './types';

export const getUsers = createAsyncThunk<IGetUsersResponse, IGetUsersRequest>(
    'users.getAll',
    async (arg, {rejectWithValue}) => {
        const response = await usersApi.getUsers(arg.currentPage, arg.pageSize, arg.term, arg.friend);
        if (response.status !== 200) {
            return rejectWithValue('Can\'t get users. Server Error');
        }
        return response.data;
    }
);

export const follow = createAsyncThunk<number, number>(
    'users.follow',
    async (userId) => {
        return await usersApi.follow(userId);
    }
);

export const unfollow = createAsyncThunk<number, number>(
    'users.unfollow',
    async (userId) => {
        return await usersApi.unfollow(userId);
    }
);

export const initialState: InitialStateUsers = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    followingInProgress: [],
    filter: {
        term: '',
        friend: '',
    },
    isFetching: false,
    error: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.isFetching = true;
                state.currentPage = action.meta.arg.currentPage;
                state.filter.term = action.meta.arg.term;
                state.filter.friend = action.meta.arg.friend;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.items;
                state.totalUsersCount = action.payload.totalCount;
                state.isFetching = false;
            })

            .addCase(follow.pending, (state: InitialStateUsers, action) => {
                state.followingInProgress.push(action.meta.arg);
            })
            .addCase(follow.fulfilled, (state: InitialStateUsers, action) => {
                const followedUser = state.users.find(user => user.id === action.meta.arg);
                if (followedUser) followedUser.followed = true;
                state.followingInProgress = state.followingInProgress.filter(id => id !== action.meta.arg);
            })

            .addCase(unfollow.pending, (state: InitialStateUsers, action) => {
                state.followingInProgress.push(action.meta.arg);
            })
            .addCase(unfollow.fulfilled, (state: InitialStateUsers, action) => {
                const followedUser = state.users.find(user => user.id === action.meta.arg);
                if (followedUser) followedUser.followed = false;
                state.followingInProgress = state.followingInProgress.filter(id => id !== action.meta.arg);
            })

            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.isFetching = false;
            });
    },
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}