import React, {useEffect, useRef, useState} from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import Dialog from './Dialog/Dialog';
import NewMessageForm from './NewMessageForm';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../store/dialogs/dialogsSlice';

const Dialogs: React.FC = () => {
    const dispatch = useAppDispatch();
    const dialogs = useAppSelector(state => state.dialogs.dialogs);
    const messages = useAppSelector(state => state.dialogs.messages);
    const status = useAppSelector(state => state.dialogs.status);
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
    const anchorAutoScroll = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(startMessagesListening(dispatch));
        return () => {
            dispatch(stopMessagesListening(dispatch));
        };
    }, []);

    useEffect(() => {
        if (isAutoScroll) anchorAutoScroll.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };

    const onSendMessage = (messageText: string) => {
        if (messageText.trim() !== '') {
            dispatch(sendMessage(messageText));
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
                <div className={s.messagesWrap} onScroll={scrollHandler}>
                    {messagesElements}
                    <div ref={anchorAutoScroll}/>
                </div>
                <NewMessageForm status={status} onSendMessage={onSendMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;