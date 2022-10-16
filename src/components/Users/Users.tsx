import React from 'react';
import styles from './Users.module.css';
import Pagination from "./Pagination/Pagination";
import User from "./User/User";
import {IUser} from "../../redux/usersReducer";
import UsersFilterForm from './UsersFilterForm/UsersFilterForm';


interface Props {
    totalCount: number
    pageSize: number
    currentPage:  number
    onPageChanged: (pageNumber: number) => void
    onFilterChange: (term: string) => void
    followingInProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    users: IUser[]
    term: string
}

const Users: React.FC<Props> = (props) => {

    return (
        <div className={styles.userArea}>

            <Pagination totalCount={props.totalCount} pageSize={props.pageSize}
                        currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>

            <UsersFilterForm onFilterChange={props.onFilterChange}
            term={props.term}/>

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