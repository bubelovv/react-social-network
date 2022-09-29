import React from 'react';
// import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = ({profile, status, updateStatus, isOwner, savePhoto, saveInfo}) => {

    return (
        <div>
            <ProfileInfo profile={profile} status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         saveInfo={saveInfo}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile