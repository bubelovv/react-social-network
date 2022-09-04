import React from 'react';
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/authReducer";
import Header from "./Header";
import * as axios from "axios";

class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                let {id, email, login} = {...response.data.data};
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
    }
};

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);