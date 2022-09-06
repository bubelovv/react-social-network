import React from 'react';
import {connect} from "react-redux";
import {getAuthUserData, setAuthUserData} from "../../redux/authReducer";
import Header from "./Header";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = state => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        email: state.auth.email,
    }
};

export default connect(mapStateToProps, {setAuthUserData, getAuthUserData})(HeaderContainer);