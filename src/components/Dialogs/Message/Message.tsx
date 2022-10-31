import React from 'react';
import s from '../Dialogs.module.css';
import avatar from '../../../assets/images/avatar.jpg';

interface Props {
    name: string;
    message: string;
}

const Message: React.FC<Props> = ({name, message}) => {
    return (
        <div className={s.messageWrap}>
            <div className={s.msgAvatarWrap}>
                <img className={s.avatar}
                     alt="avatar"
                     src={avatar}/>
            </div>

            <div className={s.message}>
                <strong>{name}</strong>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Message;