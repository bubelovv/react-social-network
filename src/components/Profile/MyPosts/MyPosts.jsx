import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";

const MyPosts = props => {

    let postsElements = props.posts.map(p => <Post message={p.message} count={p.likesCount}/>);

    let addPost = () => props.dispatch(addPostActionCreator());

    let updateNewPostText = (e) => {
        let text = e.target.value;
        props.dispatch(updateNewPostTextActionCreator(text));
    }

    return (
        <div className={s.posts}>
            <div>New post:</div>
            <div className={s.add}>
                <textarea placeholder='Enter your post...'
                          onChange={updateNewPostText}
                          value={props.newPostText}/>
                <button onClick={addPost}>Add post</button>
            </div>

            <div>
                My posts:
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts