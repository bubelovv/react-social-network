import React from 'react'
import {useForm, UseFormSetError} from 'react-hook-form'
import s from './Login.module.css'
import cn from "classnames";

export interface LoginFormValues {
    email: string
    password: string
    checkbox: boolean
    captcha: string | null
}

interface PropsLoginForm {
    onSubmit: (data: LoginFormValues, setError: UseFormSetError<LoginFormValues>) => void
    urlCaptcha: string | null
}

const Login: React.FC<PropsLoginForm> = ({onSubmit, urlCaptcha}) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid, touchedFields},
    } = useForm<LoginFormValues>({mode: 'onChange'})

    const inputCls = (inputName: keyof LoginFormValues) => cn(
        s.field,
        {[s.fieldValid]: touchedFields[inputName] && !errors[inputName]},
        {[s.fieldInvalid]: touchedFields[inputName] && errors[inputName]}
    )

    return (
        <div className={s.formWrap}>
            <form className={s.form}
                  onSubmit={handleSubmit((data) => onSubmit(data, setError))}>
                <div className={s.formName}>LOGIN FORM</div>

                {errors?.email && (
                    <div className={s.error}>{errors.email.message || 'Errors'}</div>
                )}
                <input
                    placeholder={'email'}
                    className={inputCls('email')}
                    {...register('email', {
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

export default Login