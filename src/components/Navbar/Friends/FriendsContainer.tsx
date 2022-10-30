import React from 'react';
import Friends from "./Friends";
import {connect} from "react-redux";
import {RootState} from "../../../store/store";
import {IFriend} from "../../../store/sidebarReducer";

interface MapStateProps {
    friends: IFriend[]
}

const mapStateToProps = (state: RootState): MapStateProps => {
    return {
        friends: state.sidebar.friends,
    }
}

const FriendsContainer = connect<MapStateProps, {}, {}, RootState>(mapStateToProps)(Friends)

export default FriendsContainer