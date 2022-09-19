import React from 'react';
import s from './MyPosts.module.css';
import { useForm } from 'react-hook-form';

const NewPostForm = (props) => {
	let {
		register,
		handleSubmit,
		formState: { errors, isValid, touchedFields },
		reset,
	} = useForm({ mode: 'onBlur' });

	let onSubmit = (data) => {
		props.addPost(data.newPostText);
		reset();
	};

	let textareaCls = !touchedFields.newPostText
		? s.textarea
		: isValid
		? s.textarea + ' ' + s.textareaValid
		: s.textarea + ' ' + s.textareaInvalid;

	return (
		<form className={s.add} onSubmit={handleSubmit(onSubmit)}>
			<h4 style={{color: "#000"}}>New post:</h4>
			<div>
				<textarea
					className={textareaCls}
					placeholder="Enter your post..."
					{...register('newPostText', {
						required: 'This field is required',
						minLength: {
							value: 3,
							message: 'Minimum length is 3',
						},
					})}
				/>
			</div>
			<div className={s.errorText}>
				{errors?.newPostText && <p>{errors?.newPostText?.message || 'Error!'}</p>}
			</div>
			<div>
				<button disabled={!isValid}>Add post</button>
			</div>
		</form>
	);
};

export default NewPostForm;
