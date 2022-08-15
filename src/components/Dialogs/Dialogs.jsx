import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = props => {

    const dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem state={dialog}/>);

    const messagesElements = props.dialogsPage.messages.map(message => <Message message={message.message}/>);

    let newMessageElement = React.useRef(null);

    let addMessage = () => {
        props.addMessage();
    };

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.updateNewMessageText(text);
    };

    return (
        // <div className={s.dialogSection}>
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    {messagesElements}
                </div>
                <div className={s.add}>
                    <textarea ref={newMessageElement}
                              value={props.dialogsPage.newMessageText}
                              onChange={onMessageChange}/>
                    <button onClick={addMessage}>Add</button>
                </div>
            </div>
        </div>
        // </div>
    );
};

export default Dialogs;