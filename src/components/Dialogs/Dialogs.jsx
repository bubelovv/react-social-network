import React from 'react';
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = props => {

    const dialogsElements = props.state.dialogs.map(dialog => <DialogItem state={dialog}/>);

    const messagesElements = props.state.messages.map(message => <Message message={message.message}/>);

    let newMessageElement = React.useRef(null);

    let addMessage = () => {
        let text = newMessageElement.current.value;
        props.addPost(newMessageElement)
    }

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
                    <textarea ref={newMessageElement}></textarea>
                    <button onClick={addMessage}>Add</button>
                </div>
            </div>
        </div>
        // </div>
    );
};

export default Dialogs;