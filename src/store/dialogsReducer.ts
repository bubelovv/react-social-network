import {InferValueTypes} from './store';

const ADD_MESSAGE = 'ADD_MESSAGE';

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

// type ThunkType = BaseThunkType<ActionTypes>

export const actions = {
    addMessage: (name: string, newMessageText: string) => ({type: ADD_MESSAGE, name, newMessageText}),
};

const avatar: string = 'https://images.unsplash.com/photo-1666831283699-27263e1e04cd';

const initialState = {
    dialogs: [
        {id: 1, name: 'Bubelov', avatar: avatar},
        {id: 2, name: 'Darinka', avatar: avatar},
        {id: 3, name: 'Aleksey', avatar: avatar},
        {id: 4, name: 'Manga', avatar: avatar},
        {id: 5, name: 'Ilysha', avatar: avatar},
    ],
    messages: [
        {id: 1, name: 'Aleksey', message: 'I will work in it-industry'},
        {id: 2, name: 'Aleksey', message: 'I wait you so much, Lybimka'},
        {id: 3, name: 'Aleksey', message: 'I do not know, we will go to the ocean or not...'},
    ],
};

export interface DialogType {
    id: number,
    name: string,
    avatar: string,
}

export interface MessageType {
    id: number,
    name: string,
    message: string,
}

export interface InitialState {
    dialogs: DialogType[];
    messages: MessageType[];
}

const dialogsReducer = (state = initialState, action: ActionTypes): InitialState => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let message = action.newMessageText;
            if (message.trim() === '') return state;

            return {
                ...state,
                messages: [...state.messages, {id: state.messages.length, name: action.name, message: message}],
            };
        }
        default:
            return state;
    }
};

export default dialogsReducer;