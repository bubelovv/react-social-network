import React, {ChangeEvent, FC, useState} from 'react';
import s from './NewPost.module.css';
import {addPost} from '../../../../store/profile/profileSlice';
import {useAppDispatch} from '../../../../store/store';

interface Props {
}

const NewPost: FC<Props> = () => {
    const dispatch = useAppDispatch();
    const [newPostText, setNewPostText] = useState('');
    const [errorPost, setErrorPost] = useState(false);

    const onAddPost = () => {
        dispatch(addPost({newPostText}));
    };

    const changeNewPost = (e: ChangeEvent<HTMLInputElement>) => {
        const newPost = e.target.value;
        setNewPostText(newPost);
        setErrorPost(newPost.length < 3 && newPost.length !== 0);
    };

    return (
        <div className={s.newPostWrapper}>
            <input className={s.newPostInput}
                   placeholder={'Enter new post...'}
                   value={newPostText}
                   onChange={changeNewPost}
            />
            <div className={s.addBtnWrap}>
                <button onClick={onAddPost} disabled={newPostText.length < 3}>Add post</button>
                {errorPost && <p>Enter more then 3 symbol!</p>}
            </div>
        </div>
    );
};

export default NewPost;
