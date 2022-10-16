import React, {useEffect} from 'react';
import {
    getUsers,
    // actions,
    follow,
    unfollow,
    IUser,
} from '../../redux/usersReducer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from './Preloader/Preloader';
import {compose} from 'redux';
import {RootState} from '../../redux/reduxStore';

type MapStateProps = {
    users: IUser[]
    currentPage: number
    pageSize: number
    totalCount: number
    isFetching: boolean
    followingInProgress: number[]
    filter: { term: string }
}

type MapDispatchProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, term: string) => void
}

type Props = MapStateProps & MapDispatchProps

const UsersContainer: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize, props.filter.term);
    }, []);

    const onPageChanged = (currentPage: number) => {
        const {pageSize, filter} = props;
        props.getUsers(currentPage, pageSize, filter.term);
    };

    const onFilterChange = (term: string) => {
        props.getUsers(1, props.pageSize, term);
    };

    return (
        props.isFetching ?
            <Preloader/> :
            <Users users={props.users}
                   currentPage={props.currentPage}
                   pageSize={props.pageSize}
                   totalCount={props.totalCount}
                   followingInProgress={props.followingInProgress}
                   onPageChanged={onPageChanged}
                   onFilterChange={onFilterChange}
                   term={props.filter.term}
                   follow={props.follow}
                   unfollow={props.unfollow}/>
    );
};

const mapStateToProps = (state: RootState): MapStateProps => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        filter: state.usersPage.filter,
    };
};

export default compose(
    connect<MapStateProps,
        MapDispatchProps,
        {},
        RootState>(mapStateToProps, {getUsers, follow, unfollow}),
    // withAuthRedirect,
)(UsersContainer);
