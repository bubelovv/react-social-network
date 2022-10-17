import React from 'react';
// import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

interface Props {
    isOwner: boolean;
}

const Profile: React.FC<Props> = ({isOwner}) => {

    return (
        <div>
            <ProfileInfo isOwner={isOwner}/>
            <MyPostsContainer/>
        </div>
    );
};

export default Profile;