import React from 'react';
import {
    addPost,
    decrementLikes,
    incrementLikes, IPost,
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../redux/reduxStore";

interface MapStateProps {
    posts: IPost[]
}

type MapDispatchProps = {
    addPost: (newPostText: string) => void
    incrementLikes: (userId: number) => void
    decrementLikes: (userId: number) => void
}

const mapStateToProps = (state: RootState): MapStateProps => {
    return {
        posts: state.profilePage.posts,
    }
};

const MyPostsContainer = connect<MapStateProps, MapDispatchProps, {}, RootState>(mapStateToProps, {
    addPost,
    incrementLikes,
    decrementLikes,
})(MyPosts);

export default MyPostsContainer;