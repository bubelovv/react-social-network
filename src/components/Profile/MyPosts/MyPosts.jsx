import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';

const MyPosts = () => {

    let posts = [
        {id: 1, message: 'It\'s the last post', likesCount: 10},
        {id: 2, message: 'It\'s  the middle post', likesCount: 15},
        {id: 3, message: 'It\'s the first post', likesCount: 20},
    ]

    let postsElements = posts.map(p => <Post message={p.message} count={p.likesCount}/>)

    return (
        <div className={s.posts}>
            New post:
            <div className={s.add}>
                <textarea></textarea>
                <button>Add post</button>
            </div>

            <div>
                My posts:
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts