import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getProfile, getStatus, saveInfo, savePhoto, updateStatus} from '../../redux/profileReducer';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {getIsAuth} from "../../redux/auth-selectors";

function ProfileContainer(props) {
    let params = useParams();
    let userId = params.userId;
    if (!userId) {
        userId = props.authorisedUserId; //create redirect with helps JSX-Component and react-hooks
    }

    useEffect(() => {
        props.getProfile(userId);
        props.getStatus(userId);
    }, [params])

    return (
        <Profile
            isOwner={userId === props.authorisedUserId}
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
            savePhoto={props.savePhoto}
            saveInfo={props.saveInfo}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorisedUserId: state.auth.id,
        isAuth: getIsAuth(state),
    };
};


export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveInfo}),
    withAuthRedirect,
)(ProfileContainer);
