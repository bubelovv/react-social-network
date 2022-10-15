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
import Preloader from "./Preloader/Preloader";
import {compose} from "redux";
import {RootState} from "../../redux/reduxStore";

type MapStateProps = {
    users: IUser[]
    currentPage:  number
    pageSize: number
    totalCount: number
    isFetching: boolean
    followingInProgress: number[]
}

type MapDispatchProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    // setCurrentPage: (currentPage: number) => void
}

type Props = MapStateProps & MapDispatchProps

const UsersContainer: React.FC<Props> = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, []);

    const onPageChanged = (currentPage: number) => {
        // props.setCurrentPage(currentPage);
        props.getUsers(currentPage, props.pageSize)
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
                   follow={props.follow}
                   unfollow={props.unfollow}/>
    )
}

const mapStateToProps = (state: RootState): MapStateProps => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};

export default compose(
    connect<
        MapStateProps,
        MapDispatchProps,
        {},
        RootState
        >(mapStateToProps, {getUsers, follow, unfollow}),
    // withAuthRedirect,
)(UsersContainer)
