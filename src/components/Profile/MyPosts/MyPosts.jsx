import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import NewPostForm from "./NewPostForm";

const MyPosts = props => {
    console.log('render')
    let postsElements = props.posts.map(post => (
        <Post key={post.id} id={post.id} message={post.message} count={post.likesCount}
              incrementLikes={props.incrementLikes}
              decrementLikes={props.decrementLikes}/>
        ))

    return (
        <div className={s.posts}>
            <h3>New post:</h3>
            <NewPostForm newMessageText={props.newMessageText}
                         addPost={props.addPost}/>
            <div>
                My posts:
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts