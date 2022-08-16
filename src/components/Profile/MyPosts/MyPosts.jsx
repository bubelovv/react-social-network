import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';

const MyPosts = props => {

    let postsElements = props.posts.map(p => <Post message={p.message} count={p.likesCount}/>);

    let newPostElement = React.useRef(null);

    let addPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.posts}>
            New post:
            <div className={s.add}>
                <textarea onChange={onPostChange} value={props.newPostText} ref={newPostElement}/>
                <button onClick={addPost}>Add post</button>
            </div>

            <div>
                My posts:
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts