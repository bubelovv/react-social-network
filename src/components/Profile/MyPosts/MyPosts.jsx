import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';

const MyPosts = () => {
  return (
    <div className={s.posts}>
      New post:
      <div className={s.add}>
        <textarea></textarea>
        <button>Add post</button>
      </div>
      
      <div>
        My posts:
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default MyPosts