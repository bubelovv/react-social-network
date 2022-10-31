import React from 'react';
import s from './Dialogs.module.css';
import {useForm} from 'react-hook-form';
import cn from 'classnames';

interface IProps {
    sendMessage: (messageText: string) => void;
}

interface IFormValues {
    messageText: string;
}

const NewMessageForm: React.FC<IProps> = ({sendMessage}) => {
    let {
        register,
        handleSubmit,
        formState: {isValid, touchedFields},
        reset,
    } = useForm<IFormValues>({mode: 'onChange'});

    let onSubmit = (data: IFormValues) => {
        sendMessage(data.messageText);
        reset();
    };

    const textareaCls = cn(s.textarea, {[s.textareaValid]: touchedFields.messageText && isValid});

    return (
        <form className={s.newMsgForm} onSubmit={handleSubmit(onSubmit)}>
			<textarea
                className={textareaCls}
                placeholder="Enter your message..."
                {...register('messageText', {
                    required: true,
                    minLength: 1,
                })}
            />
            <button disabled={!isValid}>{'>>>'}</button>
        </form>
    );
};

export default NewMessageForm;
