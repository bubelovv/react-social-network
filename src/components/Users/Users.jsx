import React from 'react';
import styles from './Users.module.css';
import avatar from '../../assets/images/avatar.jpg'
import {NavLink} from "react-router-dom";

function Users(props) {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let pagesLeft = props.currentPage - 5 < 0 ? 0 : props.currentPage - 5;
    let pagesRight = props.currentPage + 5 > pagesCount ? pagesCount : props.currentPage + 4;
    let pagesSlice = pages.slice(pagesLeft, pagesRight);

    return (
        <div className={styles.userArea}>
            <div className={styles.btnNumbersPage}>
                {pagesSlice.map(page => {
                    return <span key={page} onClick={() => props.onPageChanged(page)}
                                 className={props.currentPage === page ? styles.selectedPage : ''}>{page}</span>
                })}
            </div>

            {props.users.map(user => <div className={styles.user} key={user.id}>
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
                                    disabled={props.followingInProgress.find(id => id === user.id)}
                                    onClick={() => props.follow(user.id)}>
                                follow
                            </button> :
                            <button className={styles.btnUnfollow}
                                    disabled={props.followingInProgress.find(id => id === user.id)}
                                    onClick={() => props.unfollow(user.id)}>
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
                        <span>{user.name}</span>
                    </div>
                </div>
            </div>)}
            {/*<button className={styles.getUsers} >Get users list</button>*/}
        </div>
    )
}

export default Users;