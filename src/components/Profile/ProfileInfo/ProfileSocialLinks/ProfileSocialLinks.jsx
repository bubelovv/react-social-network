import React from "react";
import s from '../ProfileInfo.module.css';
import fb from "../../../../assets/images/fb.png";
import vk from "../../../../assets/images/vk.png";
import twitter from "../../../../assets/images/twitter.png";
import inst from "../../../../assets/images/inst.png";
import git from "../../../../assets/images/git.png";

const ProfileSocialLinks = ({contacts}) => {

    return (
        <div className={s.aboutMe}>
            <div className={s.socialIcons}>
                <a href={contacts.facebook} className={s.link}>
                    <img src={fb} alt={'fb'}/>
                </a>
                <a href={contacts.vk} className={s.link}>
                    <img src={vk} alt={'vk'}/>
                </a>
                <a href={contacts.twitter} className={s.link}>
                    <img src={twitter} alt={'twitter'}/>
                </a>
                <a href={contacts.instagram} className={s.link}>
                    <img src={inst} alt={'inst'}/>
                </a>
                <a href={contacts.github} className={s.link}>
                    <img src={git} alt={'git'}/>
                </a>
            </div>
        </div>
    )
}

export default ProfileSocialLinks;