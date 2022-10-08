import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {
    FormValues,
    getProfile,
    getStatus,
    IProfile,
    saveInfo,
    savePhoto,
    updateStatus
} from '../../redux/profileReducer';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
// import withAuthRedirect from "../../HOC/withAuthRedirect";
import {getIsAuth} from "../../redux/auth-selectors";
import {RootState} from "../../redux/reduxStore";

interface MapStateProps {
    profile: IProfile | null
    status: string
    authorisedUserId: number | null
    isAuth: boolean
}

type MapDispatchProps = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveInfo: (profile: FormValues, setError: any) => void
}

type Props = MapStateProps & MapDispatchProps

const ProfileContainer: React.FC<Props> = (props) => {
    let params = useParams();
    let userId  = Number(params.userId);
    if (!userId) {
        if(typeof props.authorisedUserId === 'number') {
            userId = props.authorisedUserId;            //create redirect with helps JSX-Component and react-hooks
        }
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

const mapStateToProps = (state: RootState): MapStateProps => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorisedUserId: state.auth.id,
        isAuth: getIsAuth(state),
    };
};


export default compose(
    connect<
        MapStateProps,
        MapDispatchProps,
        undefined,
        RootState
        >(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveInfo}),
    // withAuthRedirect,
)(ProfileContainer);
