import React from 'react';
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";
import Header from "./Header";
import {getIsAuth} from "../../redux/auth-selectors";
import {RootState} from "../../redux/reduxStore";

interface MapStateProps {
    isAuth: boolean
    login: string | null
    email: string | null
}

interface MapDispatchProps {
    logout: () => void
}

type Props = MapStateProps & MapDispatchProps

const HeaderContainer: React.FC<Props> = (props) => {
    return <Header {...props}/>
}

let mapStateToProps = (state: RootState): MapStateProps => {
    return {
        isAuth: getIsAuth(state),
        login: state.auth.login,
        email: state.auth.email,
    }
};

export default connect<MapStateProps, MapDispatchProps, {}, RootState>(mapStateToProps, {logout})(HeaderContainer);