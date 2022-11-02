import React from 'react';
import styles from './User.module.css';
import avatar from '../../../assets/images/avatar.jpg';
import {Link} from 'react-router-dom';
import {IUser} from '../../../store/users/types';

interface Props {
    user: IUser;
    followingInProgress: number[];
    followUser: (userId: number) => void;
    unfollowUser: (userId: number) => void;
}

const User: React.FC<Props> = ({user, followUser, unfollowUser, followingInProgress}) => {
    return (
        <div className={styles.user} key={user.id}>
            <div className={styles.userFollow}>
                <Link className={styles.avatar} to={`/profile/${user.id}`}>
                    <img alt="avatar" src={user.photos.small !== null ? user.photos.small : avatar}/>
                </Link>

                {user.followed ?
                    <button className={styles.btnFollow}
                            disabled={!!followingInProgress.find(id => id === user.id)}
                            onClick={() => unfollowUser(user.id)}>
                        unfollow
                    </button> :
                    <button className={styles.btnUnfollow}
                            disabled={!!followingInProgress.find(id => id === user.id)}
                            onClick={() => followUser(user.id)}>
                        follow
                    </button>
                }
            </div>

            <div className={styles.description}>
                <span>{user.name}</span>
            </div>
        </div>
    );
};

export default User;