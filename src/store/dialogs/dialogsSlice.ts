import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DialogsState, IMessage} from './types';
import avatar from '../../assets/images/avatar.jpg';

const initialState: DialogsState = {
    dialogs: [
        {id: 1, name: 'Bubelov', avatar},
        {id: 2, name: 'Darinka', avatar},
        {id: 3, name: 'Aleksey', avatar},
        {id: 4, name: 'Manga', avatar},
        {id: 5, name: 'Ilysha', avatar},
    ],
    messages: [
        // {userId: 1, photo: '', userName: 'Aleksey', message: 'I will work in it-industry'},
        // {userId: 2, photo: '', userName: 'Aleksey', message: 'I wait you so much, Lybimka'},
        // {userId: 3, photo: '', userName: 'Aleksey', message: 'I do not know, we will go to the ocean or not...'},
    ],
};

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        sendMessage(state, action: PayloadAction<IMessage>) {
            state.messages.push({
                message: action.payload.message,
                photo: '',
                userId: action.payload.userId,
                userName: action.payload.userName,
            });
        }
    }
});

export const {sendMessage} = dialogsSlice.actions;