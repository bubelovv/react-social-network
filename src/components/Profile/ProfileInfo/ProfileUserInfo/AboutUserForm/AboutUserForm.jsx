import React from 'react';
import s from "./AboutUserForm.module.css";
import {useForm} from 'react-hook-form';

const AboutUserForm = ({profile, isOwner, goToEditMode, saveInfo}) => {
    let {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {errors, isValid, touchedFields},
        reset,
    } = useForm({
        defaultValues: profile,
    });

    let onSubmit = (formData, setError) => {    // ---------------- REFACTOR ---------------

        saveInfo(formData, setError)
            .then(() => {
                goToEditMode(false)
            })
    };

    return (
        <form className={s.userForm}
              onSubmit={handleSubmit((data) => onSubmit(data, setError))}>

            <div className={s.userInfoBlocks}>
                <div className={s.userInfoBlock}>
                    <div>Full name:</div>
                    <input
                        {...register('fullName', {
                            required: 'This field is required',
                            minLength: 3,
                        })}
                    />
                </div>
                <div className={s.userInfoBlock}>
                    <div></div>
                    <span>Looking for a job:</span>
                    <input className={s.checkBox} type={'checkbox'} {...register('lookingForAJob')}/>
                </div>
                <div className={s.userInfoBlock}>
                    <div>My skills:</div>
                    <textarea
                        {...register('lookingForAJobDescription', {
                            required: 'This field is required',
                            minLength: 3,
                        })}
                    />
                </div>
                <div className={s.userInfoBlock}>
                    <div>About me:</div>
                    <textarea
                        {...register('aboutMe', {
                            required: 'This field is required',
                            minLength: 3,
                        })}
                    />
                </div>
                <div>CONTACTS:</div>
                {Object.keys(profile.contacts).map(contact => {
                    return (
                        <div key={contact} className={s.userInfoBlock}>
                            <div className={s.contactName}>{contact}:</div>
                            <input onClick={() => clearErrors(contact)}
                                   {...register('contacts.' + contact)}/>

                            {errors[contact] && (
                                <div style={{color: 'red'}}>
                                    {errors[contact].message || 'Errors'}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {isOwner && (
                <div className={s.btnChange}>
                    <button>save user's information</button>
                </div>
            )}
        </form>
    );
};

export default AboutUserForm;