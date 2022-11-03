import React, {FC} from 'react';
import s from './Post.module.css';
import avatar from '../../../../assets/images/avatar.jpg';
import {decrementLikes, incrementLikes} from '../../../../store/profile/profileSlice';
import {useAppDispatch} from '../../../../store/store';

interface Props {
    id: number;
    likesCount: number;
    message: string;
}

const Post: FC<Props> = ({id, likesCount, message}) => {
    const dispatch = useAppDispatch();

    return (
        <div className={s.post}>
            <img src={avatar} alt="avatar"/>
            <span>{message}</span>
            <span className={s.count}> {likesCount} </span>
            <button onClick={() => dispatch(decrementLikes({id}))} className={s.dislike}> dislike </button>
            <button onClick={() => dispatch(incrementLikes({id}))} className={s.like}> like </button>
        </div>
    );
};

export default Post;