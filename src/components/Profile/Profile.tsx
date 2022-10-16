import React from 'react';
// import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {FormValues, IProfile, ThunkType} from "../../redux/profileReducer";
import {UseFormSetError} from "react-hook-form";

interface Props {
    profile: IProfile | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveInfo: (profile: FormValues, setError: UseFormSetError<FormValues>) => ThunkType
}

const Profile: React.FC<Props> = ({profile, status, updateStatus, isOwner, savePhoto, saveInfo}) => {

    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         saveInfo={saveInfo}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile