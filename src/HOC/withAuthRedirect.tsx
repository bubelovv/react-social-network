import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {getIsAuth} from "../store/auth-selectors";
import {RootState} from "../store/store";

const mapStateToProps = (state: RootState) => ({
    isAuth: getIsAuth(state)
})

interface IMapStateProps {
    isAuth: boolean,
}


type Props = IMapStateProps

export function withAuthRedirect<WCT extends JSX.IntrinsicAttributes>(WrappedWComponent: React.ComponentType<WCT>) {

    const RedirectComponent: React.FC<Props> = (props) => {
        let {isAuth, ...restProps} = props

        if(!props.isAuth) return <Navigate to={'/login'}></Navigate>

        return <WrappedWComponent {...restProps as WCT}/>
    }

    return connect<IMapStateProps, undefined, undefined, RootState>(
        mapStateToProps)(RedirectComponent)
}

export default withAuthRedirect;