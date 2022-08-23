import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    // let [count, setCount] = useState(0)
    // let increment = () => setCount(++count)

    let onIncrementLikes = () => {
        props.incrementLikes(props.id);
    };

    let onDecrementLikes = () => {
        props.decrementLikes(props.id);
    };

    return (
        <div className={s.post}>
            <img src='https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg' alt="cat"/>
            <span>{props.message}</span>
            <span className={s.count}>{props.count}</span>
            <button onClick={onDecrementLikes} className={s.dislike}> dislike</button>
            <button onClick={onIncrementLikes} className={s.like}> like</button>
            {/*<button onClick={increment} className={s.like}> {count} like</button>*/}
        </div>
    )
}

export default Post