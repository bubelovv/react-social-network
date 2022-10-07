import React from 'react';
import s from "./Friend.module.css";
import {IFriend} from "../../../../redux/sidebarReducer";

interface Props {
    friend: IFriend
}

const Friend: React.FC<Props> = ({friend}) => {
    return (
        <div className={s.friend}>
            <img className={s.avatar}
                 src={friend.avatar}
                 alt='avatar'/>
            <div className={s.name}>{friend.name}</div>
        </div>
    )
};

export default Friend;