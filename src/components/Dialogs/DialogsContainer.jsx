import React from 'react';
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = props => {
    let dialogsPage = props.store.getState().dialogsPage;

    let sendMessage = () => props.store.dispatch(sendMessageActionCreator());

    let updateNewMessageText = (text) => {
        props.store.dispatch(updateNewMessageTextActionCreator(text));
    };

    return <Dialogs dialogs={dialogsPage.dialogs}
                    messages={dialogsPage.messages}
                    sendMessage={sendMessage}
                    updateNewMessageText={updateNewMessageText}
                    newMessageText={dialogsPage.newMessageText}/>;
};

export default DialogsContainer;