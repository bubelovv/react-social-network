import React from 'react'
import {useForm} from 'react-hook-form'
import s from './Login.module.css'
import {connect} from 'react-redux'
import {login} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import {getIsAuth} from "../../redux/auth-selectors";
import cn from "classnames";

const LoginForm = ({onSubmit, urlCaptcha}) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid, touchedFields},
    } = useForm({mode: 'onChange'})

    const inputCls = inputName => cn(
        s.field,
        {[s.fieldValid]: touchedFields[inputName] && !errors[inputName]},
        {[s.fieldInvalid]: touchedFields[inputName] && errors[inputName]}
    )

    return (
        <div className={s.formWrap}>
            <form className={s.form}
                  onSubmit={handleSubmit((data) => onSubmit(data, setError))}>
                <div className={s.formName}>LOGIN FORM</div>

                {errors?.login && (
                    <div className={s.error}>{errors.login.message || 'Errors'}</div>
                )}
                <input
                    placeholder={'login'}
                    className={inputCls('login')}
                    {...register('login', {
                        required: 'This field id required',
                        minLength: {value: 5, message: 'Min length is 5 symbols'},
                        pattern: {value: /^\S+@\S+$/i, message: 'Enter the correct Email'},
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
                        minLength: {value: 4, message: 'Min length is 5 symbols'},
                    })}
                />

                <div className={s.checkbox}>
                    <p>remember me</p>
                    <input {...register('checkbox')} type={'checkbox'}/>
                </div>

                {
                    urlCaptcha !== null && (
                        <div>
                            <div>
                                <img src={urlCaptcha} alt={'captcha'}/>
                            </div>
                            <div>
                                <input
                                    placeholder={'captcha'}
                                    className={inputCls('captcha')}
                                    {...register('captcha')}
                                />
                            </div>
                        </div>
                    )
                }

                <div>
                    <button disabled={!isValid} className={s.btn}>
                        Log in
                    </button>
                </div>

            </form>
        </div>
    )
}

const Login = ({login, isAuth, urlCaptcha}) => {
    const onSubmit = (data, setError) => {
        login(data, setError)
    }

    if (isAuth) return <Navigate to={'/profile'}></Navigate>

    return <LoginForm urlCaptcha={urlCaptcha} onSubmit={onSubmit}/>
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    urlCaptcha: state.auth.urlCaptcha
})

export default connect(mapStateToProps, {login})(Login)