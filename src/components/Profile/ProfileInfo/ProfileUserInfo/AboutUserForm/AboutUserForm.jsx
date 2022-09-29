import React from 'react';
import s from "./AboutUserForm.module.css";
import {useForm} from 'react-hook-form';

const AboutUserForm = ({profile, isOwner, goToEditMode, saveInfo}) => {
    let {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid, touchedFields},
        reset,
    } = useForm({
        mode: 'onBlur',
        defaultValues: profile,
    });

    let onSubmit = (formData, setError) => {    // ---------------- REFACTOR ---------------
        saveInfo(formData, setError)
            .then(() => {
                goToEditMode()
            })
    };

    return (
        <form className={s.userForm} onSubmit={handleSubmit((data) => onSubmit(data, setError))}>
            <div>
                <div>Full name:</div>
                <input
                    {...register('fullName', {
                        required: 'This field is required',
                        minLength: 3,
                    })}
                />
            </div>
            <div> Looking for a job:
                <input type={'checkbox'} {...register('lookingForAJob')}/>
            </div>
            <div>
                <div>My skills:</div>
                <textarea
                    {...register('lookingForAJobDescription', {
                        required: 'This field is required',
                        minLength: 3,
                    })}
                />
            </div>
            <div>
                <div>About me:</div>
                <textarea
                    {...register('aboutMe', {
                        required: 'This field is required',
                        minLength: 3,
                    })}
                />
            </div>
            <div>
                {Object.keys(profile.contacts).map(contact => {
                    return (
                        <div key={contact} className={''}>
                            <div>{contact}:</div>
                            <input {...register('contacts.' + contact)}/>
                        </div>
                    )
                })}
            </div>

            {errors?.fullName && (
                <div>{errors.fullName.message || 'Errors'}</div>
            )}

            {isOwner && (
                // <div style={{flex: '0 0 70px'}}>
                <button className={s.btnChange}>save</button>

                // </div>
            )}

            {/*<div className={s.errorText}>*/}
            {/*    {errors?.newPostText && <p>{errors?.newPostText?.message || 'Error!'}</p>}*/}
            {/*</div>*/}
        </form>
    );
};

export default AboutUserForm;