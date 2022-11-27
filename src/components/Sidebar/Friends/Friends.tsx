import React from 'react';
import s from './Friends.module.css'
import Friend from "./Friend/Friend";
import {IUser} from '../../../store/users/types';

interface Props {
    friends: IUser[]
}

const Friends: React.FC<Props> = ({friends}) => {
    const friendsElements = friends.map(friend => <Friend key={friend.id} friend={friend}/>)
    return (
        <div className={s.friendsContainer}>
            <p className={s.friendsContainerName}>Friends</p>
            <div className={s.friends}>
                {friendsElements}
            </div>
        </div>
    );
};

export default Friends;