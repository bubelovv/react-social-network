import React, {useEffect, useState} from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import Dialog from './Dialog/Dialog';
import NewMessageForm from './NewMessageForm';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {sendMessage} from '../../store/dialogs/dialogsSlice';
import {IMessage} from '../../store/dialogs/types';

const Dialogs: React.FC = () => {
    const wsChat = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    const [chatMessages, setChatMessages] = useState<IMessage[]>([]);

    const dispatch = useAppDispatch();
    const dialogs = useAppSelector(state => state.dialogs.dialogs);
    const messages = useAppSelector(state => state.dialogs.messages);
    const name = useAppSelector(state => state.auth.login) as string;

    useEffect(() => {
        wsChat.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setChatMessages((prevChat) => [...prevChat, ...newMessages]);
        });
    }, []);

    const newMessage = (messageText: string) => {
        if (messageText.trim() !== '') {
            wsChat.send(messageText);
            // dispatch(sendMessage({message: messageText, photo: '', userName: name, userId: messages.length + 1}));
        }
    };

    const dialogsElements = dialogs.map(dialog => <Dialog key={dialog.id} dialog={dialog}/>);
    const messagesElements = chatMessages.map((message, index) => <Message key={index} message={message}/>);

    return (
        <div className={s.dialogsContainer}>
            <div className={s.dialogs}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <NewMessageForm sendMessage={newMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;