import React from 'react';
import s from './Dialogs.module.css';
import {useForm} from 'react-hook-form';
import cn from "classnames";

interface Props {
    addMessage: (newMessageText: string) => void
}

interface FormValues {
    newMessageText: string;
}

const NewMessageForm: React.FC<Props> = ({addMessage}) => {
    let {
        register,
        handleSubmit,
        formState: {isValid, touchedFields},
        reset,
    } = useForm<FormValues>({mode: 'onChange'});

    let onSubmit = (data: FormValues) => {
        addMessage(data.newMessageText);
        reset();
    };

    const textareaCls = cn(s.textarea, {[s.textareaValid]: touchedFields.newMessageText && isValid})

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
