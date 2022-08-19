import React from 'react';
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = props => {
    return <StoreContext.Consumer>
        {store => {
            let dialogsPage = store.getState().dialogsPage;

            let sendMessage = () => store.dispatch(sendMessageActionCreator());

            let updateNewMessageText = (text) => {
                store.dispatch(updateNewMessageTextActionCreator(text));
            };
            return <Dialogs dialogs={dialogsPage.dialogs}
                            messages={dialogsPage.messages}
                            sendMessage={sendMessage}
                            updateNewMessageText={updateNewMessageText}
                            newMessageText={dialogsPage.newMessageText}/>
        }}
    </StoreContext.Consumer>
};

export default DialogsContainer;