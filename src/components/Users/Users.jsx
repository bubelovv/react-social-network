import React from 'react';
import styles from './Users.module.css';
import avatar from '../../assets/images/avatar.jpg'
import {NavLink} from "react-router-dom";
import {usersApi} from "../../API/api";

class Users extends React.Component {
    render() {
        let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        let pagesLeft = this.props.currentPage - 5 < 0 ? 0 : this.props.currentPage - 5;
        let pagesRight = this.props.currentPage + 5 > pagesCount ? pagesCount : this.props.currentPage + 4;
        let pagesSlice = pages.slice(pagesLeft, pagesRight);

        return (
            <div className={styles.userArea}>
                <div className={styles.btnNumbersPage}>
                    {pagesSlice.map(page => {
                        return <span key={page} onClick={() => this.props.onPageChanged(page)}
                                     className={this.props.currentPage === page ? styles.selectedPage : ''}>{page}</span>
                    })}
                </div>

                {this.props.users.map(user => <div className={styles.user} key={user.id}>
                    <div className={styles.followArea}>
                        <div>
                            <NavLink to={`/profile/${user.id}`}>
                                <img alt='avatar' className={styles.avatar}
                                     src={user.photos.small !== null ? user.photos.small : avatar}/>
                            </NavLink>
                        </div>
                        <div>
                            {
                                user.followed ?
                                    <button className={styles.btnFollow}
                                            disabled={this.props.followingInProgress.find(id => id === user.id)}
                                            onClick={() => {
                                                this.props.toggleFollowingProgress(true, user.id);
                                                usersApi.unfollow(user.id)
                                                    .then(resultCode => {
                                                        if (resultCode === 0) {
                                                            this.props.unfollow(user.id)
                                                        }
                                                        this.props.toggleFollowingProgress(false, user.id);
                                                    });
                                            }}>
                                        follow
                                    </button> :
                                    <button className={styles.btnUnfollow}
                                            disabled={this.props.followingInProgress.find(id => id === user.id)}
                                            onClick={() => {
                                                this.props.toggleFollowingProgress(true, user.id);
                                                usersApi.follow(user.id)
                                                    .then(resultCode => {
                                                        if (resultCode === 0) {
                                                            this.props.follow(user.id)
                                                        }
                                                        this.props.toggleFollowingProgress(false, user.id);
                                                    });
                                            }}>
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
}

export default Users;