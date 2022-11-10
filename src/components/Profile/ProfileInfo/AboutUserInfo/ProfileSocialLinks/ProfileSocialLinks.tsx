import React from 'react';
import s from './ProfileSocialLinks.module.css';
import facebook from '../../../../../assets/images/fb.png';
import vk from '../../../../../assets/images/vk.png';
import twitter from '../../../../../assets/images/twitter.png';
import instagram from '../../../../../assets/images/inst.png';
import github from '../../../../../assets/images/git.png';
import avatar from '../../../../../assets/images/avatar.jpg';
import {IContactsProfile} from '../../../../../store/profile/types';

interface SocialIcons {
    facebook: string;
    vk: string;
    twitter: string;
    instagram: string;
    github: string;
}

interface Props {
    contacts: IContactsProfile;
}

const ProfileSocialLinks: React.FC<Props> = ({contacts}) => {
    const socialIcons: SocialIcons = {facebook, vk, twitter, instagram, github};

    const contactsList = Object.entries(contacts).map(contact => (
            contact[1] && (
                <a href={contact[1]} key={contact[0]} className={s.link}>
                    <img src={socialIcons[contact[0] as keyof SocialIcons] || avatar} alt={'contact'}/>
                </a>
            )
        )
    );

    return (
        <div className={s.socialWrap}>
            <span>Social links</span>
            <div className={s.socialIcons}>
                {contactsList}
            </div>
        </div>
    );
};

export default ProfileSocialLinks;