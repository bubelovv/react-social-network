import React from 'react';
import s from './AboutUserForm.module.css';
import {useForm, UseFormSetError} from 'react-hook-form';
import {IContactsProfile, IProfile, IUserInfoFormValues} from '../../../../store/profile/types';
import {saveInfo} from '../../../../store/profile/profileSlice';
import {useAppDispatch} from '../../../../store/store';

interface Props {
    profile: IProfile,
    goOutEditMode: () => void,
}

const AboutUserForm: React.FC<Props> = ({profile, goOutEditMode}) => {
    const dispatch = useAppDispatch();

    let {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {errors},
    } = useForm<IUserInfoFormValues>({
        defaultValues: profile,
    });

    const onSubmit = (formData: IUserInfoFormValues, setError: UseFormSetError<IUserInfoFormValues>) => {
        dispatch(saveInfo({profile: formData, setError, goOutEditMode}));
    };

    return (
        <form className={s.userForm}
              onSubmit={handleSubmit((data) => onSubmit(data, setError))}>

            <div className={s.userInfoBlock}>
                <span className={s.contactName}>Full name:</span>
                <input
                    {...register('fullName', {
                        required: 'This field is required',
                        minLength: 3,
                    })}
                />
            </div>
            <div className={s.userInfoBlock}>
                <span>Looking for a job:</span>
                <input className={s.checkBox} type={'checkbox'} {...register('lookingForAJob')}/>
            </div>
            <div className={s.userInfoBlock}>
                <span>My skills:</span>
                <textarea
                    {...register('lookingForAJobDescription', {
                        required: 'This field is required',
                        minLength: 3,
                    })}
                />
            </div>
            <div className={s.userInfoBlock}>
                <span>About me:</span>
                <textarea
                    {...register('aboutMe', {
                        required: 'This field is required',
                        minLength: 3,
                    })}
                />
            </div>

            {
                Object.keys(profile.contacts).map((contact) => (
                    <div key={contact} className={s.userInfoBlock}>
                        <span className={s.contactName}>{contact}:</span>
                        <input onClick={() => clearErrors(`contacts.${contact}` as keyof IUserInfoFormValues)}
                               {...register(`contacts.${contact}` as keyof IUserInfoFormValues)}/>

                        {errors?.contacts && errors.contacts[contact as keyof IContactsProfile] && (
                            <div style={{color: 'red'}}>
                                {
                                    (errors?.contacts[contact as keyof IContactsProfile] &&
                                        errors.contacts[contact as keyof IContactsProfile]?.message) || 'Errors'
                                }
                            </div>
                        )}
                    </div>
                ))
            }
            <div className={s.buttonsContainer}>
                <button type="submit">save</button>
                <button onClick={goOutEditMode}>close</button>
            </div>
        </form>
    );
};

export default AboutUserForm;