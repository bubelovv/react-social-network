import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/icons8-internet-64.png"

const Header = props => {
    return (
        <header className={s.header}>
            <img
                src={logo}
                alt="train"
            />
            <div>
                <div className={s.login}>
                    {
                        props.isAuth ?
                            <div className={s.wrap}>
                                <div className={s.loginWrap}>
                                    <div className={s.loginName}> {props.login} </div>
                                    <button className={s.block} onClick={props.logout}>Logout</button>
                                </div>
                                <div>{props.email}</div>
                            </div> :
                            <NavLink className={s.block} to='/login'>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header