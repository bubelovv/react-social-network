// import React from 'react';
import {
    followAC,
    setCurrentPageAC,
    setTotalCountAC,
    setUsersAC,
    unfollowAC
} from "../../redux/usersReducer";
import {connect} from "react-redux";
import UsersC from "./UsersC";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
    }
};

const mapStateToDispatch = (dispatch) => {
    return {
        follow: userId => dispatch(followAC(userId)),
        unfollow: userId => dispatch(unfollowAC(userId)),
        setUsers: (users) => dispatch(setUsersAC(users)),
        setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
        setTotalCount: (totalCount) => dispatch(setTotalCountAC(totalCount)),
    }
};

const UsersContainer = connect(mapStateToProps, mapStateToDispatch)(UsersC);

export default UsersContainer;