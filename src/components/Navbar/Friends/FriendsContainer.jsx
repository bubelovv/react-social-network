import React from 'react';
import Friends from "./Friends";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        friends: state.sidebar.friends,
    }
};

const mapStateToDispatch = (dispatch) => {};

const FriendsContainer = connect(mapStateToProps, mapStateToDispatch)(Friends)

export default FriendsContainer;