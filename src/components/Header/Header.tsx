import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/icons8-internet-64.png"

interface Props {
    isAuth: boolean
    login: string | null
    email: string | null
    logout: () => void
}

const Header: React.FC<Props> = ({isAuth, login, logout, email}) => {
    return (
        <header className={s.header}>
            <img
                src={logo}
                alt="train"
            />
            <div className={s.login}>
                {
                    isAuth ?
                        <div className={s.wrap}>
                            <div className={s.loginWrap}>
                                <div className={s.loginName}> {login} </div>
                                <button className={s.block} onClick={logout}>Logout</button>
                            </div>
                            <div>{email}</div>
                        </div> :
                        <NavLink className={s.block} to='/login'>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header