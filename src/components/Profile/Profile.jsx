import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import Wallpaper from './Wallpaper/Wallpaper';

const Profile = () => {
  return (
    <div>
      <Wallpaper />
      <MyPosts />
    </div>
  )
}

export default Profile