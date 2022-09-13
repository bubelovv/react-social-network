import React from 'react'
import { useForm } from 'react-hook-form'
import s from './Login.module.css'
import { connect } from 'react-redux'
import {login} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";

const LoginForm = props => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, touchedFields },
	} = useForm({ mode: 'onBlur' })

	const inputCls = inputName =>
		!touchedFields[inputName]
			? s.field
			: !errors[inputName]
			? s.field + ' ' + s.fieldValid
			: s.field + ' ' + s.fieldInvalid

	return (
		<div className={s.formWrap}>
			<form className={s.form} onSubmit={handleSubmit(props.onSubmit)}>
				<div className={s.formName}>LOGIN FORM</div>

				{errors?.login && (
					<div className={s.error}>{errors.login.message || 'Errors'}</div>
				)}
				<input
					placeholder={'login'}
					className={inputCls('login')}
					{...register('login', {
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

				{errors?.password && (
					<div className={s.error}>{errors.password.message || 'Errors'}</div>
				)}
				<input
					placeholder={'password'}
					className={inputCls('password')}
					{...register('password', {
						required: 'This field id required',
						minLength: {
							value: 5,
							message: 'Min lenght is 5 sumbols',
						},
					})}
				/>

				<div className={s.checkbox}>
					<input {...register('checkbox')} type={'checkbox'} />
					<p>remember me</p>
				</div>

				<div>
					<button disabled={!isValid} className={s.btn}>
						Log in
					</button>
				</div>
			</form>
		</div>
	)
}

const Login = props => {
	const onSubmit = data => {
		props.login(data.login, data.password, data.checkbox)
	}

	if(props.isAuth) return <Navigate to={'/profile'}></Navigate>

	return <LoginForm onSubmit={onSubmit} />
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth
	}
}

export default connect(mapStateToProps, {login})(Login)