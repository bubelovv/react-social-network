import React, {FC} from 'react';
import Post from './Post/Post';
import {useAppSelector} from '../../../store/store';
import NewPost from './NewPost/NewPost';

interface Props {
    isOwner: boolean;
}

const Posts: FC<Props> = ({isOwner}) => {
    const posts = useAppSelector(state => state.profilePage.posts);

    const postsElements = [...posts].reverse().map(post => <Post key={post.id}
                                                                 id={post.id}
                                                                 name={post.name}
                                                                 date={post.date}
                                                                 message={post.message}
                                                                 likesCount={post.likesCount}/>);

    return (
        <>
            {isOwner && <NewPost/>}
            <div>
                {postsElements}
            </div>
        </>
    );
};

export default Posts;