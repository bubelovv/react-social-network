import React from 'react';
import styles from './Users.module.css';
import Pagination from "./Pagination/Pagination";
import User from "./User/User";

function Users(props) {

    return (
        <div className={styles.userArea}>

            <Pagination totalCount={props.totalCount} pageSize={props.pageSize}
                        currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>

            {props.users.map(user => <User key={user.id}
                                           user={user}
                                           followingInProgress={props.followingInProgress}
                                           follow={props.follow}
                                           unfollow={props.unfollow}
            />)}
        </div>
    )
}

export default Users;