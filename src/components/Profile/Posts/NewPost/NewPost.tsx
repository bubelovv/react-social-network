import React, {ChangeEvent, FC, useState} from 'react';
import s from './NewPost.module.css';
import {addPost} from '../../../../store/profile/profileSlice';
import {useAppDispatch} from '../../../../store/store';
import MyButton from '../../../../UI/MyButton/MyButton';

interface Props {
}

const NewPost: FC<Props> = () => {
    const dispatch = useAppDispatch();
    const [newPostText, setNewPostText] = useState('');
    const [errorPost, setErrorPost] = useState(false);

    const onAddPost = () => {
        setNewPostText('');

        const newDate = new Date();
        const addZero = (num: number) => (num >= 0 && num <= 9) ? '0' + num : num;
        const date =
            `${addZero(newDate.getDate())}.${addZero(newDate.getMonth() + 1)}.${addZero(newDate.getFullYear())}`;

        dispatch(addPost({newPostText, date}));
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
                <MyButton onClick={onAddPost} disabled={newPostText.length < 3}>Add post</MyButton>
                {errorPost && <p>Enter more then 3 symbol!</p>}
            </div>
        </div>
    );
};

export default NewPost;
