import React from 'react';
import styles from '.././Users.module.css';
import avatar from '../../../assets/images/avatar.jpg'
import {NavLink} from "react-router-dom";

function User({user, unfollow, follow, followingInProgress}) {
    return (
        <div className={styles.user} key={user.id}>
            <div className={styles.followArea}>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img alt='avatar' className={styles.avatar}
                             src={user.photos.small !== null ? user.photos.small : avatar}/>
                    </NavLink>
                </div>

                <div>
                    {user.followed ?
                        <button className={styles.btnFollow}
                                disabled={followingInProgress.find(id => id === user.id)}
                                onClick={() => follow(user.id)}>
                            follow
                        </button> :
                        <button className={styles.btnUnfollow}
                                disabled={followingInProgress.find(id => id === user.id)}
                                onClick={() => unfollow(user.id)}>
                            unfollow
                        </button>
                    }
                </div>
            </div>

            <div className={styles.description}>
                <div className={styles.userInfo}>
                    <span>{user.name}</span>
                    <span>{user.id}</span>
                </div>
                <div className={styles.location}>
                    <span>{user.name}</span>
                    <span>{user.id}</span>
                </div>
            </div>
        </div>
    )
}

export default User;