import React, {useEffect} from 'react';
import {
    getUsers,
    setCurrentPage,
    follow,
    unfollow,
} from '../../redux/usersReducer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from "./Preloader/Preloader";
import {compose} from "redux";

const UsersContainer = (props) => {
    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize)
    }, []);

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     super.componentDidUpdate(prevProps, prevState, snapshot);
    // }

    const onPageChanged = (currentPage) => {
        props.setCurrentPage(currentPage);
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

const mapStateToProps = (state) => {
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
    connect(mapStateToProps, {getUsers, setCurrentPage, follow, unfollow}),
    // withAuthRedirect,
)(UsersContainer)
