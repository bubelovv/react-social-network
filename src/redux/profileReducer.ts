import {profileApi} from '../API/api';
import {ThunkAction} from "redux-thunk";
import {RootState} from "./reduxStore";

const ADD_POST = 'ADD-POST';
const INCREMENT_LIKES = 'INCREMENT_LIKES';
const DECREMENT_LIKES = 'DECREMENT_LIKES';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

interface AddPost {
    type: typeof ADD_POST,
    newPostText: string
}

interface IncrementLikes {
    type: typeof INCREMENT_LIKES,
    userId: number
}

interface DecrementLikes {
    type: typeof DECREMENT_LIKES,
    userId: number
}

interface SetUserProfile {
    type: typeof SET_USER_PROFILE,
    profile: IProfile
}

interface SetStatus {
    type: typeof SET_STATUS,
    status: string
}

interface DeletePost {
    type: typeof DELETE_POST,
    id: number
}

interface SavePhotoSuccess {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosProfile
}

type ActionTypes = AddPost | IncrementLikes | DecrementLikes |
    SetUserProfile | SetStatus | DeletePost | SavePhotoSuccess
type ThunkType = ThunkAction<Promise<void>, RootState, undefined, ActionTypes>

export const addPost = (newPostText: string): AddPost => ({type: ADD_POST, newPostText});
export const incrementLikes = (userId: number): IncrementLikes => ({type: INCREMENT_LIKES, userId});
export const decrementLikes = (userId: number): DecrementLikes => ({type: DECREMENT_LIKES, userId});
export const setUserProfile = (profile: IProfile): SetUserProfile => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: string): SetStatus => ({type: SET_STATUS, status});
export const deletePost = (id: number): DeletePost => ({type: DELETE_POST, id});
export const savePhotoSuccess = (photos: PhotosProfile): SavePhotoSuccess => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getProfile = (userId: number | null): ThunkType => async (dispatch) => {
    if (userId !== null) {
        let data = await profileApi.getProfile(userId)
        dispatch(setUserProfile(data))
    }
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileApi.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch) => {      // file should be an object?
    let response = await profileApi.savePhoto(file)
    if (response.data.resultCode === 0) {
        await dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export interface FormValues {
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    userId: number
    contacts: ContactsProfile
}

export const saveInfo = (profile: FormValues, setError: any): ThunkType => {
    return async (dispatch, getState: () => RootState): Promise<any> => {
        let response = await profileApi.saveInfo(profile)
        if (response.data.resultCode === 0) {
            const userId = getState().auth.id
            await dispatch(getProfile(userId));
        } else {
            response.data.messages.forEach((message: string) => {
                const name = message.slice(message.indexOf('>') + 1, message.indexOf(')'))
                const mainName = name[0].toLowerCase() + name.slice(1)
                setError(mainName, {type: 'server', message});
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
interface PhotosProfile {
    large: string | null
    small: string | null
}
export interface ContactsProfile {
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
    contacts: ContactsProfile
    photos: PhotosProfile
}
interface InitialStateProfile {
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
