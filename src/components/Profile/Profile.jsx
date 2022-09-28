import React from 'react';
// import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    return (
        <div>
            <ProfileInfo profile={profile} status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile