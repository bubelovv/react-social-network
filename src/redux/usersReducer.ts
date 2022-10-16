import {ResultCode} from '../API/api';
import {BaseThunkType, InferValueTypes} from './reduxStore';
import {Dispatch} from 'redux';
import {usersApi} from '../API/usersApi';
import {objectsHelper} from '../utils/object-helper';
import {IPhotosProfile} from './profileReducer';

const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_FILTER_TERM = 'SET_FILTER_TERM';
const SET_FILTER_FRIEND = 'SET_FILTER_FRIEND';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export const actions = {
    followSuccessful: (userId: number) => ({type: FOLLOW_USER, userId} as const),
    unfollowSuccessful: (userId: number) => ({type: UNFOLLOW_USER, userId} as const),
    setUsers: (users: IUser[]) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    setTotalCount: (totalCount: number) => ({type: SET_TOTAL_COUNT, totalCount} as const),
    setFilterTerm: (term: string) => ({type: SET_FILTER_TERM, term} as const),
    setFilterFriend: (friend: string) => ({type: SET_FILTER_FRIEND, friend} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => {
        return {type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId} as const;
    },
};

type ThunkType = BaseThunkType<ActionTypes>

export const getUsers = (currentPage: number, pageSize: number, term: string, friend: string): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setFilterTerm(term));
        dispatch(actions.setFilterFriend(friend));
        let data = await usersApi.getUsers(currentPage, pageSize, term, friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalCount(data.totalCount));
    };
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number, followUnfollow: string,
                                   followUnfollowAC: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let resultCode = await usersApi[followUnfollow](userId);
    if (resultCode === ResultCode.Success) {
        dispatch(followUnfollowAC(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, 'unfollow', actions.unfollowSuccessful);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, 'follow', actions.followSuccessful);
};

export interface IUser {
    id: number;
    name: string;
    status: string | null;
    photos: IPhotosProfile;
    followed: boolean;
}

export interface InitialStateUsers {
    users: IUser[]
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[] // array of users id
    filter: {
        term: string,
        friend: string,
    },
}

export const initialState: InitialStateUsers = {
    users: [],
    pageSize: 5,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
        term: '',
        friend: '',
    },
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateUsers => {
    switch (action.type) {
        case FOLLOW_USER: {
            return {
                ...state,
                users: objectsHelper(state.users, 'id', action.userId, {followed: true})
            };
        }
        case UNFOLLOW_USER: {
            return {
                ...state,
                users: objectsHelper(state.users, 'id', action.userId, {followed: false})
            };
        }
        case SET_USERS: {
            return {...state, users: [...action.users]};
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage};
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalCount: action.totalCount};
        }
        case SET_FILTER_TERM: {
            return {...state, filter: {...state.filter, term: action.term}};
        }
        case SET_FILTER_FRIEND: {
            return {...state, filter: {...state.filter, friend: action.friend}};
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching};
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        }
        default:
            return state;
    }
};

export default usersReducer;