// import React from 'react';
import {
    addPost,
    decrementLikes,
    incrementLikes,
    updateNewPostText,
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts,
    }
};

const MyPostsContainer = connect(mapStateToProps, {
    addPost,
    updateNewPostText,
    incrementLikes,
    decrementLikes,
})(MyPosts);

export default MyPostsContainer;