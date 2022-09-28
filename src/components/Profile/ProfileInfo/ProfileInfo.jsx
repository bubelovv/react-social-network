import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Users/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import ProfileSocialLinks from "./ProfileSocialLinks/ProfileSocialLinks";
import ProfileUserInfo from "./ProfileUserInfo/ProfileUserInfo";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    return (
        profile === null ? <Preloader/> :
            <div className={s.profileInfo}>
                <div className={s.wallpaper}>
                    <img src="https://wallpaperaccess.com/full/2397971.jpg" alt='bgc'/>
                </div>

                <ProfileUserInfo profile={profile}
                                 status={status}
                                 isOwner={isOwner}
                                 savePhoto={savePhoto}/>

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

                <ProfileSocialLinks contacts={profile.contacts}/>
            </div>
    )
}

export default ProfileInfo