import React, {FC} from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import NewPostForm from "./NewPostForm";
import {useAppSelector} from '../../../store/store';

interface Props {
}

const MyPosts: FC<Props> = () => {
    const posts = useAppSelector(state => state.profilePage.posts)

    const postsElements = [...posts].reverse().map(post => (
        <Post key={post.id} id={post.id} message={post.message} likesCount={post.likesCount}/>))

    return (
        <div className={s.posts}>
            <NewPostForm/>
            <div>
                My posts:
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts