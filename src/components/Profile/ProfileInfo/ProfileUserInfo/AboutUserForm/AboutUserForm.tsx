import React from 'react';
import s from "./AboutUserForm.module.css";
import {useForm} from 'react-hook-form';
import {ContactsProfile, FormValues, IProfile} from "../../../../../redux/profileReducer";

interface Props {
    profile: IProfile                                       // | null
    isOwner: boolean
    goToEditMode: () => void
    saveInfo: (formData: FormValues, setError: any) => any
}

const AboutUserForm: React.FC<Props> = ({profile, isOwner, goToEditMode, saveInfo}) => {
    let {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: profile,
    });

    let onSubmit = (formData: FormValues, setError: any) => {    // ---------------- REFACTOR ---------------
        saveInfo(formData, setError)
            .then(goToEditMode)
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

                {Object.keys(profile.contacts).map((contact: any) => {
                    return (
                        <div key={contact} className={s.userInfoBlock}>
                            <div className={s.contactName}>{contact as keyof ContactsProfile}:</div>
                            <input onClick={() => clearErrors(contact)}  // see all form but need only contacts-form
                                   {...register<any>('contacts.' + contact)}/>

                            {/*{errors[contact] && (*/}
                            {/*    <div style={{color: 'red'}}>*/}
                            {/*        {errors[contact].message || 'Errors'}*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>
                    )
                })}
            </div>

            {isOwner && (
                <>
                    <div className={s.btnChange}>
                        <button type="submit">save user's information</button>
                    </div>
                    <div className={s.btnChange}>
                        <button onClick={goToEditMode}>X close change area X</button>
                    </div>
                </>
            )}
        </form>
    );
};

export default AboutUserForm;