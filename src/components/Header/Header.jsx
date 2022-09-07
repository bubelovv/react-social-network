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
            <div>
                <div className={s.login}>
                    {
                        props.isAuth ?
                        <div>
                            <div>{props.login}</div>
                            <div>{props.email}</div>
                        </div> :
                        <NavLink to='/login'>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header