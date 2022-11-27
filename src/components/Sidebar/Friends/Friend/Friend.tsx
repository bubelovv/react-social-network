import React from 'react';
import s from "./Friend.module.css";
import {IUser} from "../../../../store/users/types";
import avatar from '../../../../assets/images/avatar.jpg'
import {Link} from 'react-router-dom';

interface Props {
    friend: IUser
}

const Friend: React.FC<Props> = ({friend}) => {
    return (
        <Link className={s.friend}  to={`/profile/${friend.id}`}>
            <img className={s.avatar}
                 src={friend.photos.large ?? avatar}
                 alt='avatar'/>
            <div className={s.name}>{friend.name}</div>
        </Link>
    )
};

export default Friend;