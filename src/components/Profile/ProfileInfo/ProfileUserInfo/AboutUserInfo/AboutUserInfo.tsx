import React from 'react';
import s from '../../ProfileInfo.module.css';
import ProfileSocialLinks from './ProfileSocialLinks/ProfileSocialLinks';
import Button from '../../../../../UI/Button/Button';
import {IProfile} from '../../../../../redux/profileReducer';

interface Props {
    profile: IProfile;
    isOwner: boolean;
    goToEditMode: () => void;
}

const AboutUserInfo: React.FC<Props> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={s.aboutMeInfo}>
            <div className={s.myInfo}>
                Name: {profile.fullName}
            </div>
            <div className={profile.aboutMe ? s.myInfo : s.myInfoRed}>
                About me: {profile.aboutMe || ' i\'m very secretive'}
            </div>
            <div className={profile.lookingForAJob ? s.myInfo : s.myInfoRed}>
                Looking for a job: {profile.lookingForAJob ? ' yes' : ' no'}
            </div>
            <div className={profile.lookingForAJobDescription ? s.myInfo : s.myInfoRed}>
                My skills: {profile.lookingForAJobDescription || 'I\'m not looking for a job'}
            </div>

            <ProfileSocialLinks contacts={profile.contacts}/>

            {isOwner && <Button goToEditMode={goToEditMode}>change user info</Button>}
        </div>
    );
};

export default AboutUserInfo;