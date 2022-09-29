import {profileApi} from '../API/api';

const ADD_POST = 'ADD-POST';
const INCREMENT_LIKES = 'INCREMENT_LIKES';
const DECREMENT_LIKES = 'DECREMENT_LIKES';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
export const incrementLikes = (id) => ({type: INCREMENT_LIKES, id});
export const decrementLikes = (id) => ({type: DECREMENT_LIKES, id});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (id) => ({type: DELETE_POST, id});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getProfile = (userId) => async (dispatch) => {
    let data = await profileApi.getProfile(userId)
    dispatch(setUserProfile(data))
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileApi.getStatus(userId)
    dispatch(setStatus(response.data))
};

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileApi.savePhoto(file)
    if (response.data.resultCode === 0) {
        await dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveInfo = (profile, setError) => async (dispatch, getState) => {
    let response = await profileApi.saveInfo(profile)
        if (response.data.resultCode === 0) {
        const userId = getState().auth.id
        dispatch(getProfile(userId));
    } else {
        setError('fullName', {type: 'server', message: response.data["messages"][0]});
        return Promise.reject()
    }
}

let initialState = {
    posts: [
        {id: 1, message: "It's the old post", likesCount: 10},
        {id: 2, message: "It's  the middle post", likesCount: 15},
        {id: 3, message: "It's the last post", likesCount: 20},
    ],
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {
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
            };
        }
        default:
            return state;
    }
};

export default profileReducer;
