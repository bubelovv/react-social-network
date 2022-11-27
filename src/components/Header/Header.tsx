import React from 'react';
import s from './Header.module.css';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/icons8-internet-64.png';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {logout} from '../../store/auth/authSlice';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const login = useAppSelector(state => state.auth.login);
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const onLogout = () => {
        dispatch(logout());
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
                    : <Link className={s.btnLogout} to="/login">Login</Link>
                }
            </div>
        </header>
    );
};

export default Header;