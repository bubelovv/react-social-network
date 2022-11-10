import React from 'react';
import s from './AboutUserInfo.module.css';
import ProfileSocialLinks from './ProfileSocialLinks/ProfileSocialLinks';
import {IProfile} from '../../../../store/profile/types';

interface Props {
    profile: IProfile;
    isOwner: boolean;
    goToEditMode: () => void;
}

const AboutUserInfo: React.FC<Props> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={s.userInfo}>
            <div className={s.infoItem}>
                Name: {profile.fullName}
            </div>
            <div className={profile.aboutMe ? s.infoItem : s.infoItem + ' ' + s.infoItemRed}>
                About me: {profile.aboutMe || ' i\'m very secretive i\'m very secretive i\'m very secretive'}
            </div>
            <div className={profile.lookingForAJob ? s.infoItem : s.infoItem + ' ' + s.infoItemRed}>
                Looking for a job: {profile.lookingForAJob ? ' yes' : ' no'}
            </div>
            <div className={profile.lookingForAJobDescription ? s.infoItem : s.infoItem + ' ' + s.infoItemRed}>
                My skills: {profile.lookingForAJobDescription || 'I don\'t have any skills'}
            </div>

            {Object.values(profile.contacts).join('') &&
                <ProfileSocialLinks contacts={profile.contacts}/>}

            {isOwner &&
                <button className={s.changeInfoBtn} onClick={goToEditMode}>
                    change user info
                </button>}
        </div>
    );
};

export default AboutUserInfo;