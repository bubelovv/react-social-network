import React, {FC, useEffect} from 'react';
import {getProfile, getStatus} from '../../store/profile/profileSlice';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/store';
import Posts from './Posts/Posts';
import Preloader from '../../UI/Preloader/Preloader';
import s from './ProfileInfo/ProfileInfo.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfileStatus from './ProfileStatus/ProfileStatus';


const Profile: FC = () => {
    const profile = useAppSelector(state => state.profilePage.profile);
    const status = useAppSelector(state => state.profilePage.status);
    const authorisedUserId = useAppSelector(state => state.auth.id);
    const dispatch = useAppDispatch();

    //todo: refactor <Navigate/>
    let params = useParams();
    let userId = Number(params.userId);
    if (!userId) {
        if (typeof authorisedUserId === 'number') {
            userId = authorisedUserId;
        }
    }

    useEffect(() => {
        if (userId !== null) {
            dispatch(getProfile(userId));
            dispatch(getStatus(userId));
        }
    }, [params]);

    return (
        profile === null ? <Preloader/> :
            <>
                {/*<div className={s.wallpaper}>*/}
                {/*    <img src="https://wallpaperaccess.com/full/2397971.jpg" alt='bgc'/>*/}
                {/*</div>*/}

                <ProfileInfo isOwner={userId === authorisedUserId} profile={profile}/>
                <ProfileStatus isOwner={userId === authorisedUserId} status={status}/>
                <Posts isOwner={userId === authorisedUserId}/>
            </>
    );
};

export default Profile;