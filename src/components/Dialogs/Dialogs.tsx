import React from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import NewMessageForm from './NewMessageForm';
import {useAppDispatch, useAppSelector} from '../../redux/reduxStore';
import {actions} from '../../redux/dialogsReducer';

const Dialogs: React.FC = () => {
    const dialogs = useAppSelector(state => state.dialogsPage.dialogs);
    const messages = useAppSelector(state => state.dialogsPage.messages);
    const name = useAppSelector(state => state.auth.login) as string;
    const dispatch = useAppDispatch();

    const addMessage = (newMessageText: string) => {
        dispatch(actions.addMessage(name, newMessageText))
    }

    const dialogsElements = dialogs.map(dialog => <DialogItem key={dialog.id} dialog={dialog}/>);
    const messagesElements = messages.map(message => <Message key={message.id} name={message.name} message={message.message}/>);

    return (
        <div className={s.dialogsContainer}>
            <div className={s.dialogs}>
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