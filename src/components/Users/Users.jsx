import React from 'react';
import styles from './Users.module.css';
import avatar from '../../assets/images/avatar.jpg'
import {NavLink} from "react-router-dom";
import axios from "axios";

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

        // onClick={() => this.props.setUserProfile(user.userId)}
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
                                    <button className={styles.btnFollow} onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': '44b20f4c-ba47-458b-8963-b987c9ae7f33'
                                            }
                                        })
                                            .then(response => {
                                                if(response.data.resultCode === 0) {
                                                    this.props.unfollow(user.id)
                                                }
                                            });

                                    }}>
                                        follow
                                    </button> :
                                    <button className={styles.btnUnfollow} onClick={() => {
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                            withCredentials: true,
                                            headers: {
                                                'API-KEY': '44b20f4c-ba47-458b-8963-b987c9ae7f33'
                                            }
                                        })
                                            .then(response => {
                                                debugger
                                                if(response.data.resultCode === 0) {
                                                    this.props.follow(user.id)
                                                }
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