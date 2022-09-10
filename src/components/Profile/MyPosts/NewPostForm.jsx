import React from 'react';
import s from "./MyPosts.module.css";
import {useForm} from "react-hook-form";

const NewPostForm = (props) => {

    let {register, handleSubmit} = useForm()

    let onSubmit = (data) => {
        props.addPost(data.newPostText);
    }

    return (
        <form className={s.add} onSubmit={handleSubmit(onSubmit)}>
                <textarea placeholder='Enter your post...' {...register("newPostText")}/>
            <button >Add post</button>
        </form>
    );
};

export default NewPostForm;