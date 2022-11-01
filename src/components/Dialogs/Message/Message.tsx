import React from 'react';
import s from '../Dialogs.module.css';
import avatar from '../../../assets/images/avatar.jpg';
import {IMessage} from '../../../store/dialogs/types';

interface Props {
    message: IMessage;
}

const Message: React.FC<Props> = ({message}) => {
    return (
        <div className={s.messageWrap}>
            <div className={s.msgAvatarWrap}>
                <img className={s.avatar}
                     alt="avatar"
                     src={avatar}/>
            </div>

            <div className={s.message}>
                <strong>{message.name}</strong>
                <p>{message.message}</p>
            </div>
        </div>
    );
};

export default Message;