import React, {FC} from 'react';
import Post from './Post/Post';
import {useAppSelector} from '../../../store/store';

interface Props {
}

const Posts: FC<Props> = () => {
    const posts = useAppSelector(state => state.profilePage.posts);

    const postsElements = [...posts].reverse().map(post => (
        <Post key={post.id}
              id={post.id}
              name={post.name}
              date={post.date}
              message={post.message}
              likesCount={post.likesCount}
        />));

    return (
        <>
            {postsElements}
        </>
    );
};

export default Posts;