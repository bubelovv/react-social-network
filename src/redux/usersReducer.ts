import {ResultCode, usersApi} from "../API/api";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./reduxStore";
import {Dispatch} from "redux";

const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

interface FollowSuccessful {
    type: typeof FOLLOW_USER,
    userId: number
}

interface UnfollowSuccessful {
    type: typeof UNFOLLOW_USER,
    userId: number
}

interface SetUsers {
    type: typeof SET_USERS,
    users: IUser[]
}

interface SetCurrentPage {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

interface SetTotalCount {
    type: typeof SET_TOTAL_COUNT,
    totalCount: number
}

interface ToggleIsFetching {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

interface toggleFollowingProgress {
    type: typeof TOGGLE_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}

type ActionTypes = FollowSuccessful | UnfollowSuccessful | SetUsers |
    SetCurrentPage | SetTotalCount | ToggleIsFetching | toggleFollowingProgress
type ThunkType = ThunkAction<Promise<void>, RootState, undefined, ActionTypes>

export const followSuccessful = (userId: number): FollowSuccessful => ({type: FOLLOW_USER, userId})
export const unfollowSuccessful = (userId: number): UnfollowSuccessful => ({type: UNFOLLOW_USER, userId})
export const setUsers = (users: IUser[]): SetUsers => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPage => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalCount = (totalCount: number): SetTotalCount => ({type: SET_TOTAL_COUNT, totalCount})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgress => {
    return {type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId};
}


export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await usersApi.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number, followUnfollow: string,
                                   followUnfollowAC: (userId: number) => UnfollowSuccessful | FollowSuccessful) => {
    dispatch(toggleFollowingProgress(true, userId));
    let resultCode = await usersApi[followUnfollow](userId)
    if (resultCode === ResultCode.Success) {
        dispatch(followUnfollowAC(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, "unfollow", unfollowSuccessful)
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, "follow", followSuccessful)
}

interface Photos {
    small: string | null
    large: string | null
}

export interface IUser {
    id: number
    name: string
    status: string | null
    photos: Photos
    followed: boolean
}

export interface InitialStateUsers {
    users: IUser[]
    pageSize: number
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[] // array of users id
}

let initialState: InitialStateUsers = {
    users: [],
    pageSize: 5,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

let objectsHelper = (object: IUser[], itemId: string, actionId: number, newObjProps: { followed: boolean }) => {
    return object.map((user: IUser) => {
        if (user[itemId as keyof IUser] === actionId) {
            return {...user, ...newObjProps}
        }
        return user
    })
}

const usersReducer = (state = initialState, action: ActionTypes): InitialStateUsers => {
    switch (action.type) {
        case FOLLOW_USER: {
            return {
                ...state,
                users: objectsHelper(state.users, "id", action.userId, {followed: true})
            }
        }
        case UNFOLLOW_USER: {
            return {
                ...state,
                users: objectsHelper(state.users, "id", action.userId, {followed: false})
            }
        }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_COUNT: {
            return {...state, totalCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export default usersReducer;