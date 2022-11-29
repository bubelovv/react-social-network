import React, {memo} from 'react';
import s from '../Dialogs.module.css';
import avatar from '../../../assets/images/avatar.jpg';
import {IMessage} from '../../../store/dialogs/types';

interface Props {
    message: IMessage;
}

const Message: React.FC<Props> = memo(({message}) => {
    console.log('rerender');
    return (
        <div className={s.messageWrap}>
            <img className={s.avatar}
                 alt="avatar"
                 src={message.photo ?? avatar}/>

            <div className={s.message}>
                <strong>{message.userName}</strong>
                <p>{message.message}</p>
            </div>
        </div>
    );
});

export default Message;