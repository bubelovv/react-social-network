import {IGetUsersResponse, usersApi} from '../../API/usersApi';
import {objectsHelper} from '../../utils/object-helper';
import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IGetUsersRequest, InitialStateUsers, IUser} from './types';

export const getUsers = createAsyncThunk<IGetUsersResponse, IGetUsersRequest>(
    'users.getAll',
    async (arg, {rejectWithValue}) => {
        const response = await usersApi.getUsers(arg.currentPage, arg.pageSize, arg.term, arg.friend);
        if (response.status !== 200) {
            return rejectWithValue('Can\'t ger users. Server Error')
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
    pageSize: 5,

    //todo: refactor name after Redux Toolkit
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
    reducers: {
        followSuccessful(state, action: PayloadAction<number>) {
            state.users = objectsHelper(state.users, 'id', action.payload, {followed: true});
        },
        unfollowSuccessful(state, action: PayloadAction<number>) {
            state.users = objectsHelper(state.users, 'id', action.payload, {followed: false});
        },
        setUsers(state, action: PayloadAction<IUser[]>) {
            state.users = action.payload;
        },
        setTotalCount(state, action: PayloadAction<number>) {
            state.totalUsersCount = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilterTerm(state, action: PayloadAction<string>) {
            state.filter.term = action.payload;
        },
        setFilterFriend(state, action: PayloadAction<string>) {
            state.filter.friend = action.payload;
        },
        toggleIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload;
        },
        toggleFollowingProgress(state, action: PayloadAction<{ isFetching: boolean, userId: number }>) {
            action.payload.isFetching
                ? state.followingInProgress.push(action.payload.userId)
                : state.followingInProgress = state.followingInProgress.filter(id => id !== action.payload.userId);
        },
    },
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
            })
    },
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export const {
    followSuccessful,
    unfollowSuccessful,
    setUsers,
    setCurrentPage,
    setTotalCount,
    setFilterTerm,
    setFilterFriend,
    toggleIsFetching,
    toggleFollowingProgress,
} = usersSlice.actions;