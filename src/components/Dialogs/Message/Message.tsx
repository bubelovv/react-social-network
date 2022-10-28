import React from 'react';
import s from '../Dialogs.module.css';

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
                     src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60"/>
            </div>

            <div className={s.message}>
                <strong>{name}</strong>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Message;