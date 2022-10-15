import React, {ReactElement} from 'react';
import {login, LoginData} from "../../redux/authReducer";
import {UseFormSetError} from "react-hook-form";
import {Navigate} from "react-router-dom";
import {RootState} from "../../redux/reduxStore";
import {getIsAuth} from "../../redux/auth-selectors";
import {compose} from "redux";
import {connect} from "react-redux";
import Login, {LoginFormValues} from "./Login";

interface MapStateProps {
    isAuth: boolean,
    urlCaptcha: string | null
}

interface MapDispatchProps {
    login: (data: LoginData, setError: UseFormSetError<LoginFormValues>) => void
}

type PropsType = MapStateProps & MapDispatchProps

const LoginContainer: React.FC<PropsType> = ({login, isAuth, urlCaptcha}) => {
    const onSubmit = (data: LoginFormValues, setError: UseFormSetError<LoginFormValues>) => {
        login(data, setError)
    }

    if (isAuth) return <Navigate to={'/profile'}></Navigate>

    return <Login urlCaptcha={urlCaptcha} onSubmit={onSubmit}/>
}


const mapStateToProps = (state: RootState): MapStateProps => ({
    isAuth: getIsAuth(state),
    urlCaptcha: state.auth.urlCaptcha
})

export default compose<ReactElement<PropsType, string > | null>(
    connect<MapStateProps,
        MapDispatchProps,
        undefined,
        RootState>(mapStateToProps, {login}
    )(LoginContainer))