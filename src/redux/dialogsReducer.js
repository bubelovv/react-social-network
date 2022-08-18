const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-POST-MESSAGE';

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE});
export const updateNewMessageTextActionCreator = (text) => {
    return {type: UPDATE_NEW_MESSAGE_TEXT, newMessageText: text}
};

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            if (state.newMessageText.trim() === '') return;
            let newMassage = {
                id: '4',
                message: state.newMessageText,
            };
            state.messages.push(newMassage);
            state.newMessageText = '';
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText;
            return state;
        default:
            return state;
    }
}

export default dialogsReducer;