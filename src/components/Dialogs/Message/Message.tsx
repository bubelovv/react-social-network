import React from 'react';
import s from '../Dialogs.module.css';

interface Props {
    message: string
}

const Message: React.FC<Props> = ({message}) => {
    return (
        <div className={s.message}>
            <div>
                <img className={s.avatar}
                     alt='avatar'
                     src='https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60'/>
            </div>
            <div>{message}</div>
        </div>
    )
}

export default Message;