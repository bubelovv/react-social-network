import React from 'react';
import {connect} from 'react-redux';
import Profile from "./Profile";
import {getMyProfile, setUserProfile} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";

class MyProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getMyProfile(this.props.router.params.userId)
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

// withAuthRedirect,
export default compose(
    connect(mapStateToProps, {setUserProfile, getMyProfile}),
    withRouter,
)(MyProfileContainer)