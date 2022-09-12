import React from 'react';
import s from './Dialogs.module.css';
import { useForm } from 'react-hook-form';

const NewMessageForm = (props) => {
	let {
		register,
		handleSubmit,
		formState: { errors, isValid, touchedFields },
		reset,
	} = useForm({ mode: 'onBlur' });

	let onSubmit = (data) => {
		alert(JSON.stringify(data, errors?.newPostText?.message));
		props.addMessage(data.newMessageText);
		reset();
	};

	let textareaCls = !touchedFields.newMessageText
		? s.textarea
		: isValid
		? s.textarea + ' ' + s.textareaValid
		: s.textarea; // Refactoring

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
