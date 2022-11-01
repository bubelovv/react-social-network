import React from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import Dialog from './Dialog/Dialog';
import NewMessageForm from './NewMessageForm';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {sendMessage} from '../../store/dialogs/dialogsSlice';

const Dialogs: React.FC = () => {
    const dispatch = useAppDispatch();
    const dialogs = useAppSelector(state => state.dialogs.dialogs);
    const messages = useAppSelector(state => state.dialogs.messages);
    const name = useAppSelector(state => state.auth.login) as string;

    const newMessage = (messageText: string) => {
        if (messageText.trim() !== '') {
            dispatch(sendMessage({message: messageText, name, id: messages.length + 1}));
        }
    };

    const dialogsElements = dialogs.map(dialog => <Dialog key={dialog.id} dialog={dialog}/>);
    const messagesElements = messages.map(message => <Message key={message.id} message={message}/>);

    return (
        <div className={s.dialogsContainer}>
            <div className={s.dialogs}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <NewMessageForm sendMessage={newMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;