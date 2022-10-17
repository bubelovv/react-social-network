import React, {useEffect} from 'react';
import styles from './Users.module.css';
import Pagination from './Pagination/Pagination';
import User from './User/User';
import UsersFilterForm from './UsersFilterForm/UsersFilterForm';
import {useAppDispatch, useAppSelector} from '../../redux/reduxStore';
import {getUsers, follow, unfollow} from '../../redux/usersReducer';

const Users: React.FC = () => {

    const usersPage = useAppSelector(state => state.usersPage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch<void>(getUsers(usersPage.currentPage, usersPage.pageSize, usersPage.filter.term, usersPage.filter.friend));
    }, []);

    const onPageChanged = (currentPage: number) => {
        dispatch<void>(getUsers(currentPage, usersPage.pageSize, usersPage.filter.term, usersPage.filter.friend));
    };

    const onFilterChange = (term: string, friend: string) => {
        dispatch<void>(getUsers(1, usersPage.pageSize, term, friend));
    };

    const followUser = (userId: number) => {
        dispatch<void>(follow(userId));
    };

    const unfollowUser = (userId: number) => {
        dispatch<void>(unfollow(userId));
    };

    return (
        <div style={usersPage.isFetching ? {display: 'none'} : {display: 'block'}} className={styles.userArea}>

            <Pagination totalCount={usersPage.totalCount} pageSize={usersPage.pageSize}
                        currentPage={usersPage.currentPage} onPageChanged={onPageChanged}/>

            <UsersFilterForm onFilterChange={onFilterChange}
                             filter={usersPage.filter}/>

            {usersPage.users.map(user => <User key={user.id}
                                               user={user}
                                               followingInProgress={usersPage.followingInProgress}
                                               followUser={followUser}
                                               unfollowUser={unfollowUser}
            />)}
        </div>
    );
};

export default Users;