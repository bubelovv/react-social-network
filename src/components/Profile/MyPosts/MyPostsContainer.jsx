import React from 'react';
import {
    addPostActionCreator,
    decrementLikesActionCreator,
    incrementLikesActionCreator,
    updateNewPostTextActionCreator,
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts,
    }
};

const mapStateToDispatch = (dispatch) => {
    return {
        addPost: () => dispatch(addPostActionCreator()),
        updateNewPostText: (text) => dispatch(updateNewPostTextActionCreator(text)),
        incrementLikes: (id) => dispatch(incrementLikesActionCreator(id)),
        decrementLikes: (id) => dispatch(decrementLikesActionCreator(id)),
    }
};

const MyPostsContainer = connect(mapStateToProps, mapStateToDispatch)(MyPosts);

export default MyPostsContainer;