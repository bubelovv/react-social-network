import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Users/Preloader/Preloader";
import fb from '../../../assets/images/fb.png'
import vk from '../../../assets/images/vk.png'
import twitter from '../../../assets/images/twitter.png'
import inst from '../../../assets/images/inst.png'
import git from '../../../assets/images/git.png'
import avatar from '../../../assets/images/avatar.jpg'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

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
                        <div className={s.myInfo}>Name: {props.profile.fullName}</div>
                        <div className={props.profile.aboutMe ? s.myInfo : s.myInfoRed}>
                            About me: {props.profile.aboutMe || 'i\'m very secretive'}
                        </div>
                        <div className={props.profile.lookingForAJob ? s.myInfo : s.myInfoRed}>
                            My job:
                            {props.profile.lookingForAJob ?
                            ' I\'m looking for a job' :
                            ' I\'m not looking for a job'}
                        </div>
                        <div className={props.status ? s.myInfo : s.myInfoRed}>
                            Status: {props.profile.lookingForAJobDescription || props.status || 'I don\'t have a status'}
                        </div>
                    </div>
                </div>

                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

                <div className={s.aboutMe}>
                    <div className={s.socialIcons}>
                        <a href={props.profile.contacts.facebook} className={s.link}>
                            <img src={fb} alt={'fb'}/>
                        </a>
                        <a href={props.profile.contacts.vk} className={s.link}>
                            <img src={vk} alt={'vk'}/>
                        </a>
                        <a href={props.profile.contacts.twitter} className={s.link}>
                            <img src={twitter} alt={'twitter'}/>
                        </a>
                        <a href={props.profile.contacts.instagram} className={s.link}>
                            <img src={inst} alt={'inst'}/>
                        </a>
                        <a href={props.profile.contacts.github} className={s.link}>
                            <img src={git} alt={'git'}/>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default ProfileInfo