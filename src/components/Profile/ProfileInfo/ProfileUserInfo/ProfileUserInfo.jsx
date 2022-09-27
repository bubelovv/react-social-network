import React from "react";
import s from '../ProfileInfo.module.css';
import avatar from "../../../../assets/images/avatar.jpg";

const ProfileUserInfo = ({profile, status}) => {

    return (
        <div className={s.aboutMe}>
            <div className={s.profileFoto}>
                <img src={profile.photos.large === null ? avatar : profile.photos.large} alt='bgc'/>
            </div>
            <div className={s.aboutMeInfo}>
                <div className={s.myInfo}>Name: {profile.fullName}</div>
                <div className={profile.aboutMe ? s.myInfo : s.myInfoRed}>
                    About me: {profile.aboutMe || 'i\'m very secretive'}
                </div>
                <div className={profile.lookingForAJob ? s.myInfo : s.myInfoRed}>
                    My job:
                    {profile.lookingForAJob ?
                        ' I\'m looking for a job' :
                        ' I\'m not looking for a job'}
                </div>
                <div className={status ? s.myInfo : s.myInfoRed}>
                    Status: {profile.lookingForAJobDescription || status || 'I don\'t have a status'}
                </div>
            </div>
        </div>
    )
}

export default ProfileUserInfo;