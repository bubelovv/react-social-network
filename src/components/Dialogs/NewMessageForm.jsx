import React from 'react';
import s from './Dialogs.module.css';
import {useForm} from 'react-hook-form';

const NewMessageForm = ({addMessage}) => {
    let {
        register,
        handleSubmit,
        formState: {isValid, touchedFields},
        reset,
    } = useForm({mode: 'onChange'});

    let onSubmit = (data) => {
        addMessage(data.newMessageText);
        reset();
    };

    let textareaCls = !touchedFields.newMessageText
        ? s.textarea
        : isValid ? s.textarea + ' ' + s.textareaValid : s.textarea; // Refactoring

    return (
        <form className={s.add} onSubmit={handleSubmit(onSubmit)}>
			<textarea
                className={textareaCls}
                placeholder="Enter your message..."
                {...register('newMessageText', {
                    required: true,
                    minLength: 1,
                })}
            />
            <button disabled={!isValid}>Add</button>
        </form>
    );
};

export default NewMessageForm;
