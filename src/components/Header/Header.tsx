import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/images/icons8-internet-64.png';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {logout} from '../../store/authReducer';

const Header: React.FC = () => {
    const login = useAppSelector(state => state.auth.login);
    const isAuth = useAppSelector(state => state.auth.isAuth);
    // const email = useAppSelector(state => state.auth.email);
    // {/*<div>{email}</div>*/}

    const dispatch = useAppDispatch();

    const onLogout = () => {
        dispatch<void>(logout());
    };

    return (
        <header className={s.header}>
            <div className={s.headerWrapper}>
                <div className={s.projectName}>
                    <img src={logo} alt="train"/>
                    <p>TRAIN MY SKILLS</p>
                </div>
                {isAuth
                    ? <div className={s.loginWrap}>
                        <div className={s.loginName}> {login} </div>
                        <button className={s.btnLogout} onClick={onLogout}>Logout</button>
                      </div>
                    : <NavLink className={s.btnLogout} to="/login">Login</NavLink>
                }
            </div>
        </header>
    );
};

export default Header;