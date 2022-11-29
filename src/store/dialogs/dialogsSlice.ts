import {createAsyncThunk, createSlice, Dispatch, PayloadAction} from '@reduxjs/toolkit';
import {DialogsState, IMessage} from './types';
import avatar from '../../assets/images/avatar.jpg';
import {dialogsApi, MessageReceivedSubscriberType, StatusChangedSubscriberType, WsStatus} from '../../API/dialogsApi';

const initialState: DialogsState = {
    dialogs: [
        {id: 1, name: 'Bubelov', avatar},
        {id: 2, name: 'Darinka', avatar},
        {id: 3, name: 'Aleksey', avatar},
        {id: 4, name: 'Manga', avatar},
        {id: 5, name: 'Ilysha', avatar},
    ],
    messages: [],
    status: 'pending',
};

let _newMessageHandler: MessageReceivedSubscriberType | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(dialogsSlice.actions.messagesReceived(messages));
        };
    }
    return _newMessageHandler;
};

let _statusChangedHandler: StatusChangedSubscriberType | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(dialogsSlice.actions.statusChanged(status));
        };
    }
    return _statusChangedHandler;
};

export const startMessagesListening = createAsyncThunk(
    'dialogs.startMessagesListening',
    async (dispatch: Dispatch) => {
        await dialogsApi.start();
        await dialogsApi.subscribe('message-received', newMessageHandlerCreator(dispatch));
        await dialogsApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
    }
);

export const stopMessagesListening = createAsyncThunk(
    'dialogs.stopMessagesListening',
    async (dispatch: Dispatch) => {
        await dialogsApi.unsubscribe('message-received', newMessageHandlerCreator(dispatch));
        await dialogsApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
        await dialogsApi.stop();
    }
);

export const sendMessage = createAsyncThunk<void, string>(
    'dialogs.sendMessage',
    async (arg) => {
        await dialogsApi.sendMessage(arg);
    }
);

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        messagesReceived(state, action: PayloadAction<IMessage[]>) {
            state.messages = [...state.messages, ...action.payload];
        },
        statusChanged(state, action: PayloadAction<WsStatus>) {
            state.status = action.payload;
        }
        // sendMessage(state, action: PayloadAction<IMessage>) {
        //     state.messages.push({
        //         message: action.payload.message,
        //         photo: '',
        //         userId: action.payload.userId,
        //         userName: action.payload.userName,
        //     });
        // }
    }
});