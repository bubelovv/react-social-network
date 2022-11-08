import React, {FC} from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import {useAppSelector} from '../../../store/store';
import NewPost from './NewPost/NewPost';

interface Props {
}

const MyPosts: FC<Props> = () => {
    const posts = useAppSelector(state => state.profilePage.posts)

    const postsElements = [...posts].reverse().map(post => (
        <Post key={post.id} id={post.id} name={post.name} date={post.date} message={post.message} likesCount={post.likesCount}/>))

    return (
        <div className={s.posts}>
            <NewPost/>
            <div>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts