import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import NewMessageForm from "./NewMessageForm";

const Dialogs = ({dialogs, messages, addMessage}) => {
    const dialogsElements = dialogs.map(dialog => <DialogItem key={dialog.id} dialog={dialog}/>);
    const messagesElements = messages.map(message => <Message key={message.id} message={message.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <NewMessageForm addMessage={addMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;