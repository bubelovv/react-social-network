import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import NewPostForm from "./NewPostForm";
import {IPost} from "../../../store/profileReducer";

interface Props {
    posts: IPost[]
    addPost: (newPostText: string) => void
    incrementLikes: (userId: number) => void
    decrementLikes: (userId: number) => void
}

const MyPosts: React.FC<Props> = (props) => {
    let postsElements = [...props.posts].reverse().map(post => (
        <Post key={post.id} postId={post.id} message={post.message} likesCount={post.likesCount}
              incrementLikes={props.incrementLikes}
              decrementLikes={props.decrementLikes}/>
        ))

    return (
        <div className={s.posts}>
            <NewPostForm addPost={props.addPost}/>
            <div>
                My posts:
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts