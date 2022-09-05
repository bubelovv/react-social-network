import React from 'react';
import {connect} from 'react-redux';
import Profile from "./Profile";
import {setUserProfile} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {profileApi} from "../../API/api";

class ProfileContainer extends React.Component {
    componentDidMount() {
        profileApi.getProfile(this.props.router.params.userId)
            .then(data => this.props.setUserProfile(data));
    };

    render() {
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

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));