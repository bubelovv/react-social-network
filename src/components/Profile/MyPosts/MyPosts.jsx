import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';

const MyPosts = props => {

    let postsElements = props.posts.map(p => <Post message={p.message} count={p.likesCount}/>);

    let newPostElement = React.useRef(null);

    let addPost = () => {
        let text = newPostElement.current.value;
        props.addPost(text)

    }

    return (
        <div className={s.posts}>
            New post:
            <div className={s.add}>
                <textarea ref={newPostElement}></textarea>
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