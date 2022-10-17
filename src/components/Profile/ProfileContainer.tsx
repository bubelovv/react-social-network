import React, {useEffect} from 'react';
import Profile from './Profile';
import {getProfile, getStatus} from '../../redux/profileReducer';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/reduxStore';


const ProfileContainer: React.FC = () => {
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
        dispatch<void>(getProfile(userId));
        dispatch<void>(getStatus(userId));
    }, [params]);

    return <Profile isOwner={userId === authorisedUserId}/>;
};

export default ProfileContainer;