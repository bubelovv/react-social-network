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
        <Post message='It is the last post' count='10'/>
        <Post message='It is the middle post' count='15'/>
        <Post message='It is the first post' count='20'/>
      </div>
    </div>
  )
}

export default MyPosts