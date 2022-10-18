import React, {useEffect} from 'react';
import styles from './Users.module.css';
import Pagination from './Pagination/Pagination';
import User from './User/User';
import UsersFilterForm from './UsersFilterForm/UsersFilterForm';
import {useAppDispatch, useAppSelector} from '../../redux/reduxStore';
import {follow, getUsers, unfollow} from '../../redux/usersReducer';
import {useSearchParams} from 'react-router-dom';

const Users: React.FC = () => {
    const {
        filter,
        currentPage,
        pageSize,
        isFetching,
        totalCount,
        users,
        followingInProgress
    } = useAppSelector(state => state.usersPage);

    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let params: {term?: string, friend?: string, page?: string} = {};
        if (filter.term.length) params.term = filter.term;
        if (filter.friend.length) params.friend = filter.friend;
        if (currentPage && currentPage > 1) params.page = String(currentPage);

        setSearchParams(params);
    }, [filter.term, filter.friend, currentPage]);

    useEffect(() => {
        const termParam = String(searchParams.get('term'));
        const friendParam = String(searchParams.get('friend'));
        const pageParam = Number(searchParams.get('page'));
        console.log(termParam, friendParam, pageParam);
        const actualTerm = termParam !== 'null' ? termParam : filter.term;
        const actualFriend = friendParam !== 'null' ? friendParam : filter.friend;
        const actualPage = pageParam !== 0 ? pageParam : currentPage;

        // friend = !friend ? friend : `${friend === 'true'}`
        dispatch<void>(getUsers(actualPage, pageSize, actualTerm, actualFriend));
    }, []);

    const onPageChanged = (currentPage: number) => {
        dispatch<void>(getUsers(currentPage, pageSize, filter.term, filter.friend));
    };

    const onFilterChange = (term: string, friend: string) => {
        dispatch<void>(getUsers(1, pageSize, term, friend));
    };

    const followUser = (userId: number) => {
        dispatch<void>(follow(userId));
    };

    const unfollowUser = (userId: number) => {
        dispatch<void>(unfollow(userId));
    };

    return (
        <div style={isFetching ? {display: 'none'} : {display: 'block'}} className={styles.userArea}>

            <Pagination totalCount={totalCount} pageSize={pageSize}
                        currentPage={currentPage} onPageChanged={onPageChanged}/>

            <UsersFilterForm onFilterChange={onFilterChange}
                             filter={filter}/>

            {users.map(user => <User key={user.id}
                                     user={user}
                                     followingInProgress={followingInProgress}
                                     followUser={followUser}
                                     unfollowUser={unfollowUser}
            />)}
        </div>
    );
};

export default Users;