const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-POST-MESSAGE';

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE});
export const updateNewMessageTextActionCreator = (text) => {
    return {type: UPDATE_NEW_MESSAGE_TEXT, newMessageText: text}
};

let initialState = {
    dialogs: [
        {
            id: '1',
            name: 'Bubelov',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyJTIwZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
        },
        {
            id: '2',
            name: 'Darinka',
            avatar: 'https://images.unsplash.com/photo-1643732994192-03856731da2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhciUyMGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60'
        },
        {
            id: '3',
            name: 'Aleksey',
            avatar: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60'
        },
        {
            id: '4',
            name: 'Manga',
            avatar: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
        },
        {
            id: '5',
            name: 'Ilysha',
            avatar: 'https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'
        },
    ],
    messages: [
        {id: '1', message: 'I will work in it-industry'},
        {id: '2', message: 'I wait you so much, Lybimka'},
        {id: '3', message: 'I do not know, we will go to the ocean or not...'},
    ],
    newMessageText: '',
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            if (state.newMessageText.trim() === '') return;

            return {
                ...state,
                messages: [...state.messages, {id: '4', message: state.newMessageText}],
                newMessageText: '',
            };
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return  {
                ...state,
                newMessageText: action.newMessageText
            };
        }
        default:
            return state;
    }
}

export default dialogsReducer;