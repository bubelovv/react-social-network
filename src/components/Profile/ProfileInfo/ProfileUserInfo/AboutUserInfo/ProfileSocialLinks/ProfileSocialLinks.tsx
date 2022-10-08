import React from "react";
import s from '../../../ProfileInfo.module.css';
import facebook from "../../../../../../assets/images/fb.png";
import vk from "../../../../../../assets/images/vk.png";
import twitter from "../../../../../../assets/images/twitter.png";
import instagram from "../../../../../../assets/images/inst.png";
import github from "../../../../../../assets/images/git.png";
import avatar from "../../../../../../assets/images/avatar.jpg";
import {ContactsProfile} from "../../../../../../redux/profileReducer";

interface Props {
    contacts: ContactsProfile
}

interface SocialIcons {
    facebook: string
    vk: string
    twitter: string
    instagram: string
    github: string
}

const ProfileSocialLinks: React.FC<Props> = ({contacts}) => {
    const socialIcons: SocialIcons = {facebook, vk, twitter, instagram, github}

    const contactsList = Object.keys(contacts).map(contact => {
        return contacts[contact as keyof ContactsProfile] && (
            <a href={contacts[contact as keyof ContactsProfile]} key={contact} className={s.link}>
                <img src={socialIcons[contact as keyof SocialIcons] || avatar} alt={''}/>
            </a>
        )
    })

    return (
        <div className={s.socialIcons}>
            {contactsList}
        </div>
    )
}

export default ProfileSocialLinks;