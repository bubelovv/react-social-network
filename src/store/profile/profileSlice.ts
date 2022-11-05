import {IDefaultResponse, ResultCode} from '../../API/api';
import {UseFormSetError} from 'react-hook-form';
import {IResponseDataPhotos, profileApi} from '../../API/profileApi';
import {InitialStateProfile, IProfile, IUserInfoFormValues} from './types';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const getProfile = createAsyncThunk<IProfile, number>(
    'profile.getProfile',
    async (userId) => {
        return await profileApi.getProfile(userId);
    }
);

export const getStatus = createAsyncThunk<string, number>(
    'profile.getStatus',
    async (userId) => {
        return await profileApi.getStatus(userId);
    }
);

export const updateStatus = createAsyncThunk<number, string>(
    'profile.updateStatus',
    async (status) => {
        return await profileApi.updateStatus(status);
    }
);

export const savePhoto = createAsyncThunk<IDefaultResponse<IResponseDataPhotos>, File>(
    'profile.saveProfile',
    async (file) => {
        return await profileApi.savePhoto(file);
    }
);

export const saveInfo = createAsyncThunk<IUserInfoFormValues,
    { profile: IUserInfoFormValues, setError: UseFormSetError<IUserInfoFormValues>, goToEditMode: () => void }>(
    'profile.saveInfo',
    async (args, {rejectWithValue}) => {
        const data = await profileApi.saveInfo(args.profile);

        if (data.resultCode !== ResultCode.Success) {
            data.messages.forEach((message: string) => {
                const name = message.slice(message.indexOf('>') + 1, message.indexOf(')'));
                const mainName = name[0].toLowerCase() + name.slice(1);

                args.setError('contacts.' + mainName as keyof IUserInfoFormValues, {type: 'server', message});
            });

            args.goToEditMode();
            return rejectWithValue('Server Error!');
        }

        args.goToEditMode();
        return args.profile;
    }
);

const initialState: InitialStateProfile = {
    posts: [
        {id: 1, message: 'It\'s the old post. It\'s the old post. It\'s the old post. ', likesCount: 10},
        {id: 2, message: 'It\'s  the middle post. It\'s  the middle post. It\'s  the middle post.', likesCount: 15},
        {id: 3, message: 'It\'s the last post. It\'s the last post. It\'s the last post. ', likesCount: 20},
    ],
    profile: null,
    status: '',
    error: null,
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
        deletePost(state, action: PayloadAction<{ id: number }>) {
            state.posts.filter(post => post.id !== action.payload.id);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(getStatus.fulfilled, (state, action) => {
                state.status = action.payload;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                if (action.payload === ResultCode.Success) {
                    state.status = action.meta.arg;
                }
            })
            .addCase(savePhoto.fulfilled, (state, action) => {
                if (action.payload.resultCode === ResultCode.Success) {
                    if (state.profile !== null) {
                        state.profile.photos = action.payload.data.photos;
                    }
                }
            })
            .addCase(saveInfo.fulfilled, (state, action) => {
                if (state.profile !== null) {
                    state.profile = {...state.profile, ...action.payload};
                }
            })
            .addCase(saveInfo.rejected, (state, action) => {
                state.error = action.error.message as string;
            });
    }
});

export const {
    addPost,
    deletePost,
    incrementLikes,
    decrementLikes,
} = profileSlice.actions;
