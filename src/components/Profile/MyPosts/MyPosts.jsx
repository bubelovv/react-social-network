import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';

const MyPosts = props => {
    let postsElements = props.posts.map(p => <Post key={p.id}
                                                   id={p.id}
                                                   message={p.message}
                                                   count={p.likesCount}
                                                   incrementLikes={props.incrementLikes}
                                                   decrementLikes={props.decrementLikes}/>);

    let onAddPost = () => {
        props.addPost();
    }

    let onUpdateNewPostText = (e) => {
        let text = e.target.value;
        props.updateNewPostText(text);
    }
    return (
        <div className={s.posts}>
            <div>New post:</div>
            <div className={s.add}>
                <textarea placeholder='Enter your post...'
                          onChange={onUpdateNewPostText}
                          value={props.newPostText}/>
                <button onClick={onAddPost}>Add post</button>
            </div>

            <div>
                My posts:
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts