import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/images/icons8-internet-64.png';
import {useAppDispatch, useAppSelector} from '../../redux/reduxStore';
import {logout} from '../../redux/authReducer';

const Header: React.FC = () => {
    const login = useAppSelector(state => state.auth.login);
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const email = useAppSelector(state => state.auth.email);

    const dispatch = useAppDispatch();

    const onLogout = () => {
        dispatch<void>(logout());
    };

    return (
        <header className={s.header}>
            <img src={logo} alt="train"/>
            <div className={s.login}>
                {isAuth ?
                    <div className={s.wrap}>
                        <div className={s.loginWrap}>
                            <div className={s.loginName}> {login} </div>
                            <button className={s.block} onClick={onLogout}>Logout</button>
                        </div>
                        <div>{email}</div>
                    </div> :
                    <NavLink className={s.block} to="/login">Login</NavLink>
                }
            </div>
        </header>
    );
};

export default Header;