// import React from 'react';
import {followAC, setUsersAC, unfollowAC} from "../../redux/usersReducer";
import {connect} from "react-redux";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
    }
};

const mapStateToDispatch = (dispatch) => {
    return {
        follow: userId => dispatch(followAC(userId)),
        unfollow: userId => dispatch(unfollowAC(userId)),
        setUsers: (users) => dispatch(setUsersAC(users)),
    }
};

const UsersContainer = connect(mapStateToProps, mapStateToDispatch)(Users);

export default UsersContainer;