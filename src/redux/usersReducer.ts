import {ResultCode} from "../API/api";
import {ThunkAction} from "redux-thunk";
import {InferValueTypes, RootState} from "./reduxStore";
import {Dispatch} from "redux";
import {usersApi} from "../API/usersApi";

const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

type ThunkType = ThunkAction<Promise<void>, RootState, undefined, ActionTypes>

export const actions = {
    followSuccessful: (userId: number) => ({type: FOLLOW_USER, userId} as const),
    unfollowSuccessful: (userId: number) => ({type: UNFOLLOW_USER, userId} as const),
    setUsers: (users: IUser[]) => ({type: SET_USERS, users} as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    setTotalCount: (totalCount: number) => ({type: SET_TOTAL_COUNT, totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => {
        return {type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId}  as const;
    },
}

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(true));
        let data = await usersApi.getUsers(currentPage, pageSize)
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userId: number, followUnfollow: string,
                                   followUnfollowAC: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let resultCode = await usersApi[followUnfollow](userId)
    if (resultCode === ResultCode.Success) {
        dispatch(followUnfollowAC(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, "unfollow", actions.unfollowSuccessful)
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, "follow", actions.followSuccessful)
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