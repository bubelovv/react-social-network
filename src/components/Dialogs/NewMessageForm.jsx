import React from "react";
import s from "./Dialogs.module.css";
import {useForm} from "react-hook-form";

const NewMessageForm = (props) => {

    let {register, handleSubmit} = useForm();

    let onSubmit = (data) => {
        props.addMessage(data.newMessageText);
    };

    return (
        <form className={s.add} onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register("newMessageText")}
                      placeholder='Enter your message...'/>
            <button>Add</button>
        </form>
    )
}

export default NewMessageForm;