import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";

const Dialogs = props => {

    const dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem state={dialog}/>);

    const messagesElements = props.dialogsPage.messages.map(message => <Message message={message.message}/>);

    let sendMessage = () => props.dispatch(sendMessageActionCreator());

    let updateNewMessageText = (e) => {
        let text = e.target.value;
        props.dispatch(updateNewMessageTextActionCreator(text));
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div className={s.add}>
                    <textarea placeholder='Enter your message...'
                              value={props.dialogsPage.newMessageText}
                              onChange={updateNewMessageText}/>
                    <button onClick={sendMessage}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;