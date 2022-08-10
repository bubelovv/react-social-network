import React from 'react';
import s from './Post.module.css';

const Post = () => {
  return (
    <div className={s.post}>
      <img src="https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg" alt="cat" />
      <span>It is old post!</span>
      <span className={s.like}>like</span>
    </div>
  )
}

export default Post