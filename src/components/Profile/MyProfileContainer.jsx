import React from 'react';
import {connect} from 'react-redux';
import Profile from "./Profile";
import {getMyProfile, setUserProfile} from "../../redux/profileReducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {compose} from "redux";

class MyProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getMyProfile(this.props.router.params.userId)
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

export default compose(
    connect(mapStateToProps, {setUserProfile, getMyProfile}),
    withRouter,
    withAuthRedirect,
)(MyProfileContainer)