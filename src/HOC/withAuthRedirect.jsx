import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {getIsAuth} from "../redux/auth-selectors";

const mapStateToProps = (state) => ({ isAuth: getIsAuth(state) })

const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        if(!props.isAuth) return <Navigate to={'/login'}></Navigate>
        return <Component {...props}/>
    }

    const ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedRedirectComponent
}

export default withAuthRedirect;