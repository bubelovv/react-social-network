import React from 'react';
import { useForm } from 'react-hook-form';
import s from './Login.module.css';

const LoginForm = (props) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, touchedFields },
	} = useForm({ mode: 'onBlur' });

	const inputCls = (inputName) =>
		!touchedFields[inputName]
			? s.field
			: !errors[inputName]
			? s.field + ' ' + s.fieldValid
			: s.field + ' ' + s.fieldInvalid;

	return (
		<div className={s.formWrap}>
			<form className={s.form} onSubmit={handleSubmit(props.onSubmit)}>
				<div className={s.formName}>LOGIN FORM</div>

				{errors?.Login && <div className={s.error}>{errors.Login.message || 'Errors'}</div>}
				<input
					placeholder={'login'}
					className={inputCls('Login')}
					{...register('Login', {
						required: 'This field id required',
						minLength: {
							value: 5,
							message: 'Min lenght is 5 sumbols',
						},
						pattern: {
							value: /^\S+@\S+$/i,
							message: 'Enter the correct Email',
						},
					})}
				/>

				{errors?.Password && <div className={s.error}>{errors.Password.message || 'Errors'}</div>}
				<input
					placeholder={'password'}
					className={inputCls('Password')}
					{...register('Password', {
						required: 'This field id required',
						minLength: {
							value: 5,
							message: 'Min lenght is 5 sumbols',
						},
					})}
				/>

				<div className={s.checkbox}>
					<input {...register('Checkbox')} type={'checkbox'} />
					<p>remember me</p>
				</div>

				<div>
					<button disabled={!isValid} className={s.btn}>
						Log in
					</button>
				</div>
			</form>
		</div>
	);
};

const Login = () => {
	const onSubmit = (data) => console.log(data);
	return <LoginForm onSubmit={onSubmit} />;
};

export default Login;
