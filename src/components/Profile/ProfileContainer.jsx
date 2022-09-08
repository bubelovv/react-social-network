import React from 'react';
import {connect} from 'react-redux';
import Profile from "./Profile";
import {getProfile, setUserProfile} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        // if (!userId) {
        //     userId = 2
        // };
        this.props.getProfile(userId)
    };

    render() {
        return <Profile profile={this.props.profile}/>
    }
}

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

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
};

// withAuthRedirect,
export default compose(
    connect(mapStateToProps, {setUserProfile, getProfile}),
    withRouter,
)(ProfileContainer)