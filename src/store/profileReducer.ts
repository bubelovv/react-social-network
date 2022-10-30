import {ResultCode} from '../API/api';
import {BaseThunkType, InferValueTypes, RootState} from "./store";
import {UseFormSetError} from "react-hook-form";
import {profileApi} from "../API/profileApi";

const ADD_POST = 'ADD-POST';
const INCREMENT_LIKES = 'INCREMENT_LIKES';
const DECREMENT_LIKES = 'DECREMENT_LIKES';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export const actions = {
    addPost: (newPostText: string) => ({type: ADD_POST, newPostText}) as const,
    incrementLikes: (userId: number) => ({type: INCREMENT_LIKES, userId}) as const,
    decrementLikes: (userId: number) => ({type: DECREMENT_LIKES, userId}) as const,
    setUserProfile: (profile: IProfile) => ({type: SET_USER_PROFILE, profile}) as const,
    setStatus: (status: string) => ({type: SET_STATUS, status}) as const,
    deletePost: (id: number) => ({type: DELETE_POST, id}) as const,
    savePhotoSuccess: (photos: IPhotosProfile) => ({type: SAVE_PHOTO_SUCCESS, photos}) as const,
}

export type ThunkType = BaseThunkType<ActionTypes>

export const getProfile = (userId: number | null): ThunkType => async (dispatch) => {
    if (userId !== null) {
        let data = await profileApi.getProfile(userId)
        dispatch(actions.setUserProfile(data))
    }
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileApi.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let resultCode = await profileApi.updateStatus(status)
    if (resultCode === ResultCode.Success) {
        dispatch(actions.setStatus(status));
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let {resultCode, data} = await profileApi.savePhoto(file)
    if (resultCode === ResultCode.Success) {
        dispatch(actions.savePhotoSuccess(data.photos));
    }
}

export interface FormValues {
    aboutMe: string
    contacts: IContactsProfile
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    userId: number
}

export const saveInfo = (profile: FormValues, setError: UseFormSetError<FormValues>): ThunkType => {
    return async (dispatch, getState: () => RootState) => {
        let data = await profileApi.saveInfo(profile)

        if (data.resultCode === ResultCode.Success) {
            const userId = getState().auth.id
            await dispatch(getProfile(userId));
        } else {
            data.messages.forEach((message: string) => {
                const name = message.slice(message.indexOf('>') + 1, message.indexOf(')'))
                const mainName = name[0].toLowerCase() + name.slice(1)

                setError('contacts.' + mainName as keyof FormValues, {type: 'server', message});
            })
            return Promise.reject()
        }
    }
}

export interface IPost {
    id: number
    message: string
    likesCount: number
}

export interface IPhotosProfile {
    large: string | null
    small: string | null
}

export interface IContactsProfile {
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}

export interface IProfile {
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    userId: number
    contacts: IContactsProfile
    photos: IPhotosProfile
}

export interface InitialStateProfile {
    posts: IPost[];
    profile: IProfile | null;
    status: string;
}

const initialState: InitialStateProfile = {
    posts: [
        {id: 1, message: "It's the old post", likesCount: 10},
        {id: 2, message: "It's  the middle post", likesCount: 15},
        {id: 3, message: "It's the last post", likesCount: 20},
    ],
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action: ActionTypes): InitialStateProfile => {
    let posts = state.posts;
    switch (action.type) {
        case ADD_POST: {
            if (action.newPostText.trim() === '') return state;
            return {
                ...state,
                posts: [
                    ...posts,
                    {id: posts[posts.length - 1].id + 1, message: action.newPostText, likesCount: 0},
                ],
            };
        }
        case INCREMENT_LIKES: {
            let newState = {
                ...state,
                posts: [...posts],
            };
            newState.posts[action.userId - 1].likesCount++;
            return newState;
        }
        case DECREMENT_LIKES: {
            let newState = {
                ...state,
                posts: [...posts],
            };
            newState.posts[action.userId - 1].likesCount--;
            return newState;
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            };
        }
        case DELETE_POST: {
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.id),
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: state.profile && {...state.profile, photos: action.photos},
            }
        }
        default:
            return state;
    }
}

export default profileReducer;
