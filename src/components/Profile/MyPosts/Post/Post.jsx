import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.post}>
      <img src="https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg" alt="cat" />
      <span>{props.message}</span>
      <span className={s.like}> {props.count} like</span>
    </div>
  )
}

export default Post