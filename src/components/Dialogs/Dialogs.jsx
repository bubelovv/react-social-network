import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = props => {
    const dialogsElements = props.dialogs.map(dialog => <DialogItem key={dialog.id} dialog={dialog}/>);

    const messagesElements = props.messages.map(message => <Message key={message.id} message={message.message}/>);

    let onSendMessage = () => {
        props.sendMessage();
    }

    let onUpdateNewMessageText = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
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
                              value={props.newMessageText}
                              onChange={onUpdateNewMessageText}/>
                    <button onClick={onSendMessage}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;