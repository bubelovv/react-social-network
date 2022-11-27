import React from 'react';
import s from "./Friend.module.css";
import {IUser} from "../../../../store/users/types";
import avatar from '../../../../assets/images/avatar.jpg'

interface Props {
    friend: IUser
}

const Friend: React.FC<Props> = ({friend}) => {
    return (
        <div className={s.friend}>
            <img className={s.avatar}
                 src={friend.photos.large ?? avatar}
                 alt='avatar'/>
            <div className={s.name}>{friend.name}</div>
        </div>
    )
};

export default Friend;