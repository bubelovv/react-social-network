import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  // let [count, setCount] = useState(0)
  // let increment = () => setCount(++count)

  return (
    <div className={s.post}>
      <img src='https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg' alt="cat" />
      <span>{props.message}</span>
      <button className={s.like}> {props.count} like</button>
      {/*<button onClick={increment} className={s.like}> {count} like</button>*/}
    </div>
  )
}

export default Post