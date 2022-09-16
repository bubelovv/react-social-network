import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile';
import {getProfile, getStatus, updateStatus} from '../../redux/profileReducer';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {compose} from 'redux';
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {getIsAuth} from "../../redux/auth-selectors";

class ProfileContainer extends React.Component {
    componentDidMount() {
        // let userId = this.props.router.params.userId;
        let userId = this.props.router.location.pathname.slice(9); // rewrite with useHooks
        if (!userId) {
            userId = this.props.authorisedUserId; //create redirect with helps JSX-Component and react-hooks
        }
        if (!userId) {

        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (
            <Profile
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        );
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{location, navigate, params}}/>;
    }

    return ComponentWithRouterProp;
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
    withRouter
)(ProfileContainer);
