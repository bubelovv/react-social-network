import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = props => {
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
                alt="twitter"
            />
            <div className={s.login}>
                {props.isAuth ? props.login :
                    <NavLink to='/login'>Login</NavLink>
                }

            </div>
        </header>
    )
}

export default Header