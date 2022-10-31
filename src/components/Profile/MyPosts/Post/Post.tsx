import React from 'react';
import s from './Post.module.css';
import avatar from '../../../../assets/images/avatar.jpg';

interface Props {
    postId: number
    likesCount: number
    message: string
    incrementLikes: (postId: number) => void
    decrementLikes: (postId: number) => void
}

const Post: React.FC<Props> = (props) => {
    let onIncrementLikes = () => {
        props.incrementLikes(props.postId);
    };

    let onDecrementLikes = () => {
        props.decrementLikes(props.postId);
    };

    return (
        <div className={s.post}>
            <img src={avatar} alt="cat"/>
            <span>{props.message}</span>
            <span className={s.count}>{props.likesCount}</span>
            <button onClick={onDecrementLikes} className={s.dislike}> dislike</button>
            <button onClick={onIncrementLikes} className={s.like}> like</button>
        </div>
    )
}

export default Post