import React from 'react';
import {connect} from 'react-redux';
import Profile from "./Profile";
import {getProfile, setUserProfile} from "../../redux/profileReducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import withAuthRedirect from "../../HOC/withAuthRedirect";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        // if (!userId) {
        //     userId = 2
        // };
        this.props.getProfile(userId)
    };

    render() {

        if(!this.props.isAuth) return <Navigate to='/login'></Navigate>

        return <Profile profile={this.props.profile}/>
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
};

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}


const AuthRedirectProfileContainer = withAuthRedirect(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile, getProfile})(withRouter(AuthRedirectProfileContainer));