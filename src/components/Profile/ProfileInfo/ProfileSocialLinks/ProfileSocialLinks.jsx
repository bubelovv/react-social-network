import React from "react";
import s from '../ProfileInfo.module.css';
import facebook from "../../../../assets/images/fb.png";
import vk from "../../../../assets/images/vk.png";
import twitter from "../../../../assets/images/twitter.png";
import instagram from "../../../../assets/images/inst.png";
import github from "../../../../assets/images/git.png";
import avatar from "../../../../assets/images/avatar.jpg";

const ProfileSocialLinks = ({contacts}) => {
    const socialIcons = {facebook, vk, twitter, instagram, github}

    const contactsList = Object.keys(contacts).map(contact => {
        return (
            <a href={contacts[contact]} key={contact} className={s.link}>
                <img src={socialIcons[contact] || avatar} alt={''}/>
            </a>
        )
    })

    return (
        <div className={s.aboutMe}>
            <div className={s.socialIcons}>
                {contactsList}
            </div>
        </div>
    )
}

export default ProfileSocialLinks;