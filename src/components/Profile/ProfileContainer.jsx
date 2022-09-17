import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getProfile, getStatus, updateStatus} from '../../redux/profileReducer';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {getIsAuth} from "../../redux/auth-selectors";

function ProfileContainer(props) {
    let params = useParams();

    useEffect(() => {
        let userId = params['*'];
        if (!userId) {
            userId = props.authorisedUserId; //create redirect with helps JSX-Component and react-hooks
        }

        props.getProfile(userId);
        props.getStatus(userId);
    }, [])

    return (
        <Profile
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
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
    connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
    withAuthRedirect,
)(ProfileContainer);
