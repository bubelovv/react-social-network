// import {ThunkAction} from "redux-thunk";
// import {RootState} from "./reduxStore";

const ADD_MESSAGE = 'ADD_MESSAGE';

interface AddMessage {
    type: typeof ADD_MESSAGE;
    newMessageText: string;
}

type ActionTypes = AddMessage
// type ThunkType = ThunkAction<Promise<void>, RootState, undefined, ActionTypes>

export const addMessage = (newMessageText: string): AddMessage => ({type: ADD_MESSAGE, newMessageText});

let avatar: string = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyJTIwZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'

let initialState = {
    dialogs: [
        {id: 1, name: 'Bubelov', avatar: avatar},
        {id: 2, name: 'Darinka', avatar: avatar},
        {id: 3, name: 'Aleksey', avatar: avatar},
        {id: 4, name: 'Manga', avatar: avatar},
        {id: 5, name: 'Ilysha', avatar: avatar},
    ],
    messages: [
        {id: 1, message: 'I will work in it-industry'},
        {id: 2, message: 'I wait you so much, Lybimka'},
        {id: 3, message: 'I do not know, we will go to the ocean or not...'},
    ],
}

export interface DialogType { id: number; name: string; avatar: string }
export interface MessageType { id: number, message: string }
export interface InitialState {
    dialogs: DialogType[];
    messages: MessageType[];
}

const dialogsReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let message = action.newMessageText
            if (message.trim() === '') return state;

            return {                            // I don't know how to work this Type
                ...state,
                messages: [...state.messages, {id: state.messages.length, message: message}],
            }
        }
        default:
            return state;
    }
}

export default dialogsReducer;