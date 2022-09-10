import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import NewMessageForm from "./NewMessageForm";

const Dialogs = props => {
    const dialogsElements = props.dialogs.map(dialog => <DialogItem key={dialog.id} dialog={dialog}/>);
    const messagesElements = props.messages.map(message => <Message key={message.id} message={message.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <NewMessageForm newMessageText={props.newMessageText}
                                addMessage={props.addMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;