import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Users/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import ProfileUserInfo from './ProfileUserInfo/ProfileUserInfo';
import {useAppSelector} from '../../../store/store';

interface Props {
    isOwner: boolean;
}

const ProfileInfo: React.FC<Props> = ({isOwner}) => {
    const profile = useAppSelector(state => state.profilePage.profile);
    const status = useAppSelector(state => state.profilePage.status);

    return (
        profile === null ? <Preloader/> :
            <div className={s.profileInfo}>
                {/*<div className={s.wallpaper}>*/}
                {/*    <img src="https://wallpaperaccess.com/full/2397971.jpg" alt='bgc'/>*/}
                {/*</div>*/}

                <ProfileUserInfo isOwner={isOwner} profile={profile}/>

                <ProfileStatusWithHooks isOwner={isOwner} status={status}/>
            </div>
    );
};

export default ProfileInfo;