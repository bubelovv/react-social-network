import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = props => {
    return <StoreContext.Consumer>
        {
            store => {
                let addPost = () => store.dispatch(addPostActionCreator());

                let updateNewPostText = (text) => {
                    store.dispatch(updateNewPostTextActionCreator(text));
                }

                return <MyPosts posts={store.getState().profilePage.posts}
                                newPostText={store.getState().profilePage.newPostText}
                                addPost={addPost}
                                updateNewPostText={updateNewPostText}/>
            }
        }
    </StoreContext.Consumer>
}

export default MyPostsContainer;