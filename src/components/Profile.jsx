import React from 'react';
import s from './Profile.module.css';

const Profile = () => {
  return (
    <div className={s.content}>
      <div>
        <img src="https://wallpaperaccess.com/full/2397971.jpg" alt='bgc'></img>
      </div>
      <div>
        <img
          src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/11/8487edde594f36bfa7541d5152be80/animals-and-society.jpg?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25"
          alt="qwer"
        ></img>
      </div>
      <div>
        My posts
        <div>New post</div>
        <div>Post 1</div>
        <div>Post 2</div>
      </div>
    </div>
  )
}

export default Profile