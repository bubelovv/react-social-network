import React from 'react';
import s from "./Friend.module.css";

const Friend = props => {
    return (
        <div className={s.friend}>
            <img className={s.avatar}
                 src={props.friend.avatar}
                 alt='avatar'/>
            <div className={s.name}>{props.friend.name}</div>
        </div>
    )
};

export default Friend;