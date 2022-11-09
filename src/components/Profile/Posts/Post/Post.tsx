import React, {FC} from 'react';
import s from './Post.module.css';
import avatar from '../../../../assets/images/avatar.jpg';
import {decrementLikes, deletePost, incrementLikes} from '../../../../store/profile/profileSlice';
import {useAppDispatch} from '../../../../store/store';

interface Props {
    id: number;
    name: string;
    date: string;
    likesCount: number;
    message: string;
}

const Post: FC<Props> = ({id, name, date, likesCount, message}) => {
    const dispatch = useAppDispatch();

    return (
        <div className={s.post}>
            <div className={s.postHead}>
                <div className={s.postHeadInfo}>
                    <img src={avatar} alt="avatar"/>
                    <span>{name}</span>
                    <span>{date}</span>
                </div>
                <div onClick={() => dispatch(deletePost({id}))} className={s.changePost}>delete</div>
            </div>
            <div className={s.postText}>{message} {message} {message} {message} {message}</div>
            <div className={s.likesBlock}>
                <span className={s.count}> {likesCount} </span>
                <button onClick={() => dispatch(incrementLikes({id}))} className={s.like}> like</button>
                <button onClick={() => dispatch(decrementLikes({id}))} className={s.dislike}> dislike</button>
            </div>
        </div>
    );
};

export default Post;