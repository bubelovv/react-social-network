import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Users/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import ProfileUserInfo from "./ProfileUserInfo/ProfileUserInfo";
import {FormValues, IProfile} from "../../../redux/profileReducer";
import {UseFormSetError} from "react-hook-form";

interface Props {
    profile: IProfile | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveInfo: (profile: FormValues, setError: UseFormSetError<FormValues>) => void
}

const ProfileInfo: React.FC<Props> = ({profile, status, updateStatus, isOwner, savePhoto, saveInfo}) => {
    return (
        profile === null ? <Preloader/> :
            <div className={s.profileInfo}>
                {/*<div className={s.wallpaper}>*/}
                {/*    <img src="https://wallpaperaccess.com/full/2397971.jpg" alt='bgc'/>*/}
                {/*</div>*/}

                <ProfileUserInfo profile={profile}
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