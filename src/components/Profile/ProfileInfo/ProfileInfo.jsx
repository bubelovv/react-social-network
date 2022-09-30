import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Users/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import ProfileUserInfo from "./ProfileUserInfo/ProfileUserInfo";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveInfo}) => {
    return (
        profile === null ? <Preloader/> :
            <div className={s.profileInfo}>
                {/*<div className={s.wallpaper}>*/}
                {/*    <img src="https://wallpaperaccess.com/full/2397971.jpg" alt='bgc'/>*/}
                {/*</div>*/}

                <ProfileUserInfo profile={profile}
                                 status={status}
                                 isOwner={isOwner}
                                 savePhoto={savePhoto}
                                 saveInfo={saveInfo}/>

                <ProfileStatusWithHooks isOwner={isOwner}
                                        status={status}
                                        updateStatus={updateStatus}/>
            </div>
    )
}

export default ProfileInfo