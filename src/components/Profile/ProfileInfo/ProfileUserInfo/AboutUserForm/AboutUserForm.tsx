import React from 'react';
import s from './AboutUserForm.module.css';
import {useForm, UseFormSetError} from 'react-hook-form';
import {FormValues, IProfile, saveInfo} from '../../../../../redux/profileReducer';
import {useAppDispatch} from '../../../../../redux/reduxStore';

interface Props {
    profile: IProfile,
    goToEditMode: () => void,
}

const AboutUserForm: React.FC<Props> = ({profile, goToEditMode}) => {
    const dispatch = useAppDispatch();

    let {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: profile,
    });

    let onSubmit = async (formData: FormValues, setError: UseFormSetError<FormValues>) => {
        await dispatch(saveInfo(formData, setError));
        goToEditMode();
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

                <div className={s.userInfoBlock}>
                    <div className={s.contactName}>{'facebook'}:</div>
                    <input onClick={() => clearErrors('contacts.facebook')}
                           {...register('contacts.facebook')}/>

                    {errors.contacts?.facebook && (
                        <div style={{color: 'red'}}>
                            {errors.contacts?.facebook.message || 'Errors'}
                        </div>
                    )}
                </div>
                <div className={s.userInfoBlock}>
                    <div className={s.contactName}>{'github'}:</div>
                    <input onClick={() => clearErrors('contacts.github')}
                           {...register('contacts.github')}/>

                    {errors.contacts?.github && (
                        <div style={{color: 'red'}}>
                            {errors.contacts?.github.message || 'Errors'}
                        </div>
                    )}
                </div>
                <div className={s.userInfoBlock}>
                    <div className={s.contactName}>{'instagram'}:</div>
                    <input onClick={() => clearErrors('contacts.instagram')}
                           {...register('contacts.instagram')}/>

                    {errors.contacts?.instagram && (
                        <div style={{color: 'red'}}>
                            {errors.contacts?.instagram.message || 'Errors'}
                        </div>
                    )}
                </div>
                <div className={s.userInfoBlock}>
                    <div className={s.contactName}>{'mainLink'}:</div>
                    <input onClick={() => clearErrors('contacts.mainLink')}
                           {...register('contacts.mainLink')}/>

                    {errors.contacts?.mainLink && (
                        <div style={{color: 'red'}}>
                            {errors.contacts?.mainLink.message || 'Errors'}
                        </div>
                    )}
                </div>
                <div className={s.userInfoBlock}>
                    <div className={s.contactName}>{'twitter'}:</div>
                    <input onClick={() => clearErrors('contacts.twitter')}
                           {...register('contacts.twitter')}/>

                    {errors.contacts?.twitter && (
                        <div style={{color: 'red'}}>
                            {errors.contacts?.twitter.message || 'Errors'}
                        </div>
                    )}
                </div>
                <div className={s.userInfoBlock}>
                    <div className={s.contactName}>{'vk'}:</div>
                    <input onClick={() => clearErrors('contacts.vk')}
                           {...register('contacts.vk')}/>

                    {errors.contacts?.vk && (
                        <div style={{color: 'red'}}>
                            {errors.contacts?.vk.message || 'Errors'}
                        </div>
                    )}
                </div>
                <div className={s.userInfoBlock}>
                    <div className={s.contactName}>{'website'}:</div>
                    <input onClick={() => clearErrors('contacts.website')}
                           {...register('contacts.website')}/>

                    {errors.contacts?.website && (
                        <div style={{color: 'red'}}>
                            {errors.contacts?.website.message || 'Errors'}
                        </div>
                    )}
                </div>
                <div className={s.userInfoBlock}>
                    <div className={s.contactName}>{'youtube'}:</div>
                    <input onClick={() => clearErrors('contacts.youtube')}
                           {...register('contacts.youtube')}/>

                    {errors.contacts?.youtube && (
                        <div style={{color: 'red'}}>
                            {errors.contacts?.youtube.message || 'Errors'}
                        </div>
                    )}
                </div>

                {/*todo: create something solution for it*/}
                {/*{Object.keys(profile.contacts).map((contact) => {*/}
                {/*    return (*/}
                {/*        <div key={contact} className={s.userInfoBlock}>*/}
                {/*            <div className={s.contactName}>{contact as keyof FormValues}:</div>*/}
                {/*            <input onClick={() => clearErrors('contacts.' + contact as keyof FormValues)}*/}
                {/*                   {...register('contacts.' + contact as keyof FormValues)}/>*/}

                {/*            {errors?.contacts && errors?.contacts[contact] && (*/}
                {/*                <div style={{color: 'red'}}>*/}
                {/*                    {errors?.contacts[contact] && errors.contacts[contact]?.message }*/}
                {/*                </div>*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*})}*/}
            </div>

            <div className={s.btnChange}>
                <button type="submit">save user's information</button>
            </div>
            <div className={s.btnChange}>
                <button onClick={goToEditMode}>go out edit mode</button>
            </div>

        </form>
    );
};

export default AboutUserForm;