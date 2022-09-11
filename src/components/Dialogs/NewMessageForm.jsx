import React from 'react'
import s from './Dialogs.module.css'
import { useForm } from 'react-hook-form'

const NewMessageForm = (props) => {
	let {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({ mode: 'onBlur' })

	let onSubmit = (data) => {
		alert(JSON.stringify(data, errors?.newPostText?.message))
		props.addMessage(data.newMessageText)
		reset()
	}

	return (
		<form className={s.add} onSubmit={handleSubmit(onSubmit)}>
			<textarea
				placeholder="Enter your message..."
				{...register('newMessageText', {
					required: 'This field is required',
				})}
			/>
			<div className={s.error}>
				{errors?.newMessageText && (
					<p>{errors?.newMessageText?.message || 'Error!'}</p>
				)}
			</div>
			<button disabled={!isValid}>Add</button>
		</form>
	)
}

export default NewMessageForm
