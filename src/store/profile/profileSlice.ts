import {ResultCode} from '../../API/api';
import {BaseThunkType, RootState} from '../store';
import {UseFormSetError} from 'react-hook-form';
import {profileApi} from '../../API/profileApi';
import {InitialStateProfile, IPhotosProfile, IProfile, IUserInfoFormValues} from './types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThunkType = BaseThunkType<any>

export const getProfile = (userId: number | null): ThunkType => async (dispatch) => {
    if (userId !== null) {
        const data = await profileApi.getProfile(userId);
        dispatch(profileSlice.actions.setUserProfile(data));
    }
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const status = await profileApi.getStatus(userId);
    dispatch(profileSlice.actions.setStatus({status}));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const resultCode = await profileApi.updateStatus(status);
    if (resultCode === ResultCode.Success) {
        dispatch(profileSlice.actions.setStatus({status}));
    }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let {resultCode, data} = await profileApi.savePhoto(file);
    if (resultCode === ResultCode.Success) {
        dispatch(profileSlice.actions.savePhotoSuccess(data.photos));
    }
};

export const saveInfo = (profile: IUserInfoFormValues, setError: UseFormSetError<IUserInfoFormValues>): ThunkType => {
    return async (dispatch, getState: () => RootState) => {
        let data = await profileApi.saveInfo(profile);

        if (data.resultCode === ResultCode.Success) {
            const userId = getState().auth.id;
            await dispatch(getProfile(userId));
        } else {
            data.messages.forEach((message: string) => {
                const name = message.slice(message.indexOf('>') + 1, message.indexOf(')'));
                const mainName = name[0].toLowerCase() + name.slice(1);

                setError('contacts.' + mainName as keyof IUserInfoFormValues, {type: 'server', message});
            });
            return Promise.reject();
        }
    };
};

const initialState: InitialStateProfile = {
    posts: [
        {id: 1, message: 'It\'s the old post. It\'s the old post. It\'s the old post. ', likesCount: 10},
        {id: 2, message: 'It\'s  the middle post. It\'s  the middle post. It\'s  the middle post.', likesCount: 15},
        {id: 3, message: 'It\'s the last post. It\'s the last post. It\'s the last post. ', likesCount: 20},
    ],
    profile: null,
    status: '',
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<{ newPostText: string }>) {
            state.posts.push({
                id: state.posts[state.posts.length - 1].id + 1,
                message: action.payload.newPostText,
                likesCount: 0
            });
        },
        incrementLikes(state, action: PayloadAction<{ id: number }>) {
            state.posts[action.payload.id - 1].likesCount++;
        },
        decrementLikes(state, action: PayloadAction<{ id: number }>) {
            state.posts[action.payload.id - 1].likesCount--;
        },
        setUserProfile(state, action: PayloadAction<IProfile>) {
            state.profile = action.payload;
        },
        setStatus(state, action: PayloadAction<{ status: string }>) {
            state.status = action.payload.status;
        },
        deletePost(state, action: PayloadAction<{ id: number }>) {
            state.posts.filter(post => post.id !== action.payload.id);
        },
        savePhotoSuccess(state, action: PayloadAction<IPhotosProfile>) {
            if (state.profile !== null) {
                state.profile.photos = action.payload;
            }
        },
    }
});

export const {
    addPost,
    savePhotoSuccess,
    deletePost,
    setStatus,
    setUserProfile,
    incrementLikes,
    decrementLikes,
} = profileSlice.actions;
