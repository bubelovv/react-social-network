import React from 'react';
// import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {FormValues, IProfile} from "../../redux/profileReducer";

interface Props {
    profile: IProfile | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveInfo: (profile: FormValues, setError: any) => void
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