import React, {useEffect} from 'react';
import styles from './Users.module.css';
import Pagination from '../../UI/Pagination/Pagination';
import User from './User/User';
import UsersFilterForm from './UsersFilterForm/UsersFilterForm';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {follow, getUsers, unfollow} from '../../store/users/usersSlice';
import {useSearchParams} from 'react-router-dom';
import Preloader from '../../UI/Preloader/Preloader';

const Users: React.FC = () => {
    const {
        error,
        filter,
        currentPage,
        pageSize,
        isFetching,
        totalUsersCount,
        users,
        followingInProgress
    } = useAppSelector(state => state.usersPage);

    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Если в state есть filter и currentPage, то вставляем их в адресную строку
        const params: { term?: string, friend?: string, page?: string } = {};
        if (filter.term.length) params.term = filter.term;
        if (filter.friend.length) params.friend = filter.friend;
        if (currentPage && currentPage > 1) params.page = String(currentPage);

        setSearchParams(params);
    }, [filter.term, filter.friend, currentPage]);

    useEffect(() => {
        // Берём параметры filter и currentPage из адресной строки
        const termParam = String(searchParams.get('term'));
        const friendParam = String(searchParams.get('friend'));
        const pageParam = Number(searchParams.get('page'));

        // Если параметры в адресной строке были, то getUsers c ними, иначе getUsers со значениями из state
        const actualTerm = termParam !== 'null' ? termParam : filter.term;
        const actualFriend = friendParam !== 'null' ? friendParam : filter.friend;
        const actualPage = pageParam !== 0 ? pageParam : currentPage;

        dispatch(getUsers({currentPage: actualPage, pageSize, term: actualTerm, friend: actualFriend}));
    }, []);

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsers({currentPage, pageSize, term: filter.term, friend: filter.friend}));
    };

    const onFilterChange = (term: string, friend: string) => {
        dispatch(getUsers({currentPage: 1, pageSize, term, friend}));
    };

    const followUser = (userId: number) => {
        dispatch(follow(userId));
    };

    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    };

    return (
        <div className={styles.usersWrap}>

            <UsersFilterForm onFilterChange={onFilterChange}
                             filter={filter}/>

            <Pagination totalCount={totalUsersCount} pageSize={pageSize}
                        currentPage={currentPage} onPageChanged={onPageChanged}/>

            {error
                ? <h1>error</h1>
                : <div className={styles.users}>
                    {isFetching
                        ? <Preloader/>
                        : users.map(user => <User key={user.id}
                                                  user={user}
                                                  followingInProgress={followingInProgress}
                                                  followUser={followUser}
                                                  unfollowUser={unfollowUser}
                        />)
                    }
                </div>
            }
        </div>
    );
};

export default Users;