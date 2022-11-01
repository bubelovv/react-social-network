import React from 'react';
import styles from '.././Users.module.css';
import avatar from '../../../assets/images/avatar.jpg'
import {Link} from "react-router-dom";
import {IUser} from "../../../store/usersReducer";

interface Props {
    user: IUser
    followingInProgress: number[]
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
}

const User: React.FC<Props> = ({user, followUser, unfollowUser, followingInProgress}) => {
    return (
        <div className={styles.user} key={user.id}>
            <div className={styles.followArea}>
                <div>
                    <Link to={`/profile/${user.id}`}>
                        <img alt='avatar' className={styles.avatar}
                             src={user.photos.small !== null ? user.photos.small : avatar}/>
                    </Link>
                </div>

                <div>
                    {user.followed ?
                        <button className={styles.btnFollow}
                                disabled={!!followingInProgress.find(id => id === user.id)}
                                onClick={() => followUser(user.id)}>
                            follow
                        </button> :
                        <button className={styles.btnUnfollow}
                                disabled={!!followingInProgress.find(id => id === user.id)}
                                onClick={() => unfollowUser(user.id)}>
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