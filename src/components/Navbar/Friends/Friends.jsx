import React from 'react';
import s from './Friends.module.css'
import Friend from "./Friend/Friend";

const Friends = ({friends}) => {
    let friendsElements = friends.map(friend => <Friend key={friend.id} friend={friend}/>)
    return (
        <div className={''}>
            <h3>Friends</h3>
            <div className={s.friends}>
                {friendsElements}
            </div>
        </div>
    );
};

export default Friends;