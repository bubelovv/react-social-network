import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../store/store';
// import FriendsContainer from "./Friends/FriendsContainer";

const setClass = (navData: any) => navData.isActive ? s.active : '';

const Navbar = () => {
    const myId = useAppSelector(state => state.auth.id)

    return (
        <div>
            <nav className={s.nav}>
                <NavLink className={setClass} to={`/profile/${myId}`}>Profile</NavLink>
                <NavLink className={setClass} to="/dialogs">Dialogs</NavLink>
                <NavLink className={setClass} to="/users">Users</NavLink>
                <NavLink className={setClass} to="/news">News</NavLink>
                <NavLink className={setClass} to="/music">Music</NavLink>
                <NavLink className={setClass} to="/settings">Settings</NavLink>
                {/*<FriendsContainer/>*/}
            </nav>
        </div>
    );
};


export default Navbar;