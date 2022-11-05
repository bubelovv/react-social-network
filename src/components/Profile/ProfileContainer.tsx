import React, {FC, useEffect} from 'react';
import Profile from './Profile';
import {getProfile, getStatus} from '../../store/profile/profileSlice';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/store';


const ProfileContainer: FC = () => {
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

    return <Profile isOwner={userId === authorisedUserId}/>;
};

export default ProfileContainer;