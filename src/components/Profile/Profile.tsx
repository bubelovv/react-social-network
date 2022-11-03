import React from 'react';
// import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';

interface Props {
    isOwner: boolean;
}

const Profile: React.FC<Props> = ({isOwner}) => {

    return (
        <div>
            <ProfileInfo isOwner={isOwner}/>
            <MyPosts/>
        </div>
    );
};

export default Profile;