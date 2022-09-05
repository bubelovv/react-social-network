import React from 'react';
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/authReducer";
import Header from "./Header";
import {authApi} from "../../API/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        authApi.auth().then(data => {
                let {id, email, login} = {...data};
                this.props.setAuthUserData(id, email, login);
            });
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

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);