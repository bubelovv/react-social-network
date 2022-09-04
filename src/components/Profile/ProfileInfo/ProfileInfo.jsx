import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Users/Preloader/Preloader";
import fb from '../../../assets/images/fb.png'
import vk from '../../../assets/images/vk.png'
import twitter from '../../../assets/images/twitter.png'
import inst from '../../../assets/images/inst.png'
import git from '../../../assets/images/git.png'
import avatar from '../../../assets/images/avatar.jpg'

const ProfileInfo = props => {
    return (
        props.profile === null ? <Preloader/> :
            <div className={s.profileInfo}>
                <div className={s.wallpaper}>
                    <img src="https://wallpaperaccess.com/full/2397971.jpg" alt='bgc'/>
                </div>
                <div className={s.aboutMe}>
                    <div className={s.profileFoto}>
                        <img src={props.profile.photos.large === null ? avatar : props.profile.photos.large} alt='bgc'/>
                    </div>
                    <div className={s.aboutMeInfo}>
                        <div className={s.myInfo}>fullName: {props.profile.fullName}</div>
                        <div className={s.myInfo}>{props.profile.aboutMe}</div>

                        <div className={s.myInfo}>{props.profile.lookingForAJob ? 'I\'m looking for a job' : ''}</div>
                        <div className={s.myInfo}>{props.profile.lookingForAJobDescription}</div>
                    </div>
                </div>
                <div className={s.aboutMe}>
                    <div className={s.socialIcons}>
                        <a href={props.profile.contacts.facebook} className={s.link}>
                            <img src={fb}/>
                        </a>
                        <a href={props.profile.contacts.vk} className={s.link}>
                            <img src={vk}/>
                        </a>
                        <a href={props.profile.contacts.twitter} className={s.link}>
                            <img src={twitter}/>
                        </a>
                        <a href={props.profile.contacts.instagram} className={s.link}>
                            <img src={inst}/>
                        </a>
                        <a href={props.profile.contacts.github} className={s.link}>
                            <img src={git}/>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default ProfileInfo