import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DialogsState, IMessage} from './types';
// import {InferValueTypes} from './store';
// type ActionTypes = ReturnType<InferValueTypes<typeof actions>>
// type ThunkType = BaseThunkType<ActionTypes>

const avatar: string = 'https://images.unsplash.com/photo-1666831283699-27263e1e04cd';

const initialState: DialogsState = {
    dialogs: [
        {id: 1, name: 'Bubelov', avatar},
        {id: 2, name: 'Darinka', avatar},
        {id: 3, name: 'Aleksey', avatar},
        {id: 4, name: 'Manga', avatar},
        {id: 5, name: 'Ilysha', avatar},
    ],
    messages: [
        {id: 1, name: 'Aleksey', message: 'I will work in it-industry'},
        {id: 2, name: 'Aleksey', message: 'I wait you so much, Lybimka'},
        {id: 3, name: 'Aleksey', message: 'I do not know, we will go to the ocean or not...'},
    ],
};

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        sendMessage(state, action: PayloadAction<IMessage>) {
            state.messages.push({
                id: action.payload.id,
                name: action.payload.name,
                message: action.payload.message,
            })
        }
    }
})

export const {sendMessage} = dialogsSlice.actions