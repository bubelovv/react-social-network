import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const setClass = navData => navData.isActive ? s.active : '';

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink className={setClass} to="/profile">Profile</NavLink>
            </div>
            <div>
                <NavLink className={setClass} to="/messages">Messages</NavLink>
            </div>
            <div>
                <NavLink className={setClass} to="/news">News</NavLink>
            </div>
            <div>
                <NavLink className={setClass} to="/music">Music</NavLink>
            </div>
            <div>
                <NavLink className={setClass} to="/settings">Settings</NavLink>
            </div>
        </nav>
    )
}

export default Navbar