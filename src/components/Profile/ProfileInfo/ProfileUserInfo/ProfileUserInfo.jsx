import React from "react";
import s from '../ProfileInfo.module.css';
import avatar from "../../../../assets/images/avatar.jpg";

const ProfileUserInfo = ({profile, status, isOwner, savePhoto}) => {

    const mainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.aboutMe}>
            <div className={s.profilePhoto}>
                <img src={ profile.photos.large || avatar } alt='bgc'/>

                {isOwner && (
                    <label htmlFor ="file-upload" className={s.customInputFile}>
                        Change Photo
                        <input hidden id="file-upload" type={"file"} onChange={mainPhotoSelected}/>
                    </label>
                )}

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