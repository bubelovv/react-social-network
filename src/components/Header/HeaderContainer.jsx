import React from 'react';
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import Header from "./Header";
import {getIsAuth} from "../../redux/auth-selectors";

function HeaderContainer(props) {
    return <Header {...props}/>
}

let mapStateToProps = state => {
    return {
        login: state.auth.login,
        isAuth: getIsAuth(state),
        email: state.auth.email,
    }
};

export default connect(mapStateToProps, {logout})(HeaderContainer);