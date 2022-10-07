import {profileApi} from '../API/api';

const ADD_POST = 'ADD-POST';
const INCREMENT_LIKES = 'INCREMENT_LIKES';
const DECREMENT_LIKES = 'DECREMENT_LIKES';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

interface AddPost {
    type: typeof ADD_POST;
    newPostText: string;
}
interface IncrementLikes {type: typeof INCREMENT_LIKES, id: number}
interface DecrementLikes {type: typeof DECREMENT_LIKES, id: number}
interface SetUserProfile {type: typeof SET_USER_PROFILE, profile: Profile}
interface SetStatus {type: typeof SET_STATUS, status: string}
interface DeletePost {type: typeof DELETE_POST, id: number}
interface SavePhotoSuccess {type: typeof SAVE_PHOTO_SUCCESS, photos: PhotosProfile}

export const addPost = (newPostText: string): AddPost => ({type: ADD_POST, newPostText});
export const incrementLikes = (id: number): IncrementLikes => ({type: INCREMENT_LIKES, id});
export const decrementLikes = (id: number): DecrementLikes => ({type: DECREMENT_LIKES, id});
export const setUserProfile = (profile: Profile): SetUserProfile => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: string): SetStatus => ({type: SET_STATUS, status});
export const deletePost = (id: number): DeletePost => ({type: DELETE_POST, id});
export const savePhotoSuccess = (photos: PhotosProfile): SavePhotoSuccess => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getProfile = (userId: number) => async (dispatch: any) => {
    let data = await profileApi.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileApi.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {      // file should be an object?
    let response = await profileApi.savePhoto(file)
    if (response.data.resultCode === 0) {
        await dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveInfo = (profile: Profile, setError: any) => async (dispatch: any, getState: any) => {
    let response = await profileApi.saveInfo(profile)
    if (response.data.resultCode === 0) {
        const userId = getState().auth.id
        dispatch(getProfile(userId));
    } else {
        response.data.messages.forEach((message: string) => {
            const name = message.slice(message.indexOf('>') + 1, message.indexOf(')'))
            const mainName = name[0].toLowerCase() + name.slice(1)
            setError(mainName, {type: 'server', message});
        })
        return Promise.reject()
    }
}

interface Post {id: number
    message: string
    likesCount: number}
interface PhotosProfile {
    large: string | null
    small: string | null
}
interface ContactsProfile {
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}
interface Profile {
    aboutMe: string
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    userId: number
    contacts: ContactsProfile
    photos: PhotosProfile
}
interface InitialStateProfile {
    posts: Post[];
    profile: Profile | null;
    status: string;
}

let initialState: InitialStateProfile = {
    posts: [
        {id: 1, message: "It's the old post", likesCount: 10},
        {id: 2, message: "It's  the middle post", likesCount: 15},
        {id: 3, message: "It's the last post", likesCount: 20},
    ],
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action: any): InitialStateProfile => {
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
            newState.posts[action.id - 1].likesCount++;
            return newState;
        }
        case DECREMENT_LIKES: {
            let newState = {
                ...state,
                posts: [...posts],
            };
            newState.posts[action.id - 1].likesCount--;
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
                ...state, profile: {...state.profile, photos: action.photos},
            } as InitialStateProfile;
        }
        default:
            return state;
    }
};

export default profileReducer;
