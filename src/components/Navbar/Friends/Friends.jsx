import React from 'react';
import s from './Friends.module.css'
import Friend from "./Friend/Friend";

const Friends = props => {

    let friendsElements = props.friends.map(friend => <Friend friend={friend}/>)

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