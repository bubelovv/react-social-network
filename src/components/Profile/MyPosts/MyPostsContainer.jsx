import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = props => {
    let addPost = () => props.store.dispatch(addPostActionCreator());

    let updateNewPostText = (text) => {
        props.store.dispatch(updateNewPostTextActionCreator(text));
    }

    return <MyPosts posts={props.store.getState().profilePage.posts}
                    newPostText={props.store.getState().profilePage.newPostText}
                    addPost={addPost}
                    updateNewPostText={updateNewPostText}/>
}

export default MyPostsContainer;