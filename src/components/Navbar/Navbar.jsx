import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
// import FriendsContainer from "./Friends/FriendsContainer";

const setClass = navData => navData.isActive ? s.active : '';

const Navbar = props => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink className={setClass} to="/profile">Profile</NavLink>
            </div>
            <div>
                <NavLink className={setClass} to="/dialogs">Dialogs</NavLink>
            </div>
            <div>
                <NavLink className={setClass} to="/users">Users</NavLink>
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
            {/*<FriendsContainer/>*/}
        </nav>
    )
}


export default Navbar