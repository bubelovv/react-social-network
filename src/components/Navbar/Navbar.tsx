import React from 'react';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUsers, faMusic, faGear} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope, faNewspaper, } from '@fortawesome/free-regular-svg-icons';
import styles from './Navbar.module.css';
import {useAppSelector} from '../../store/store';
// import FriendsContainer from "./Friends/FriendsContainer";

const Navbar = () => {
    const myId = useAppSelector(state => state.auth.id);

    const setClass = ({isActive}: { isActive: boolean }) => isActive ? styles.active : '';

    return (
        <nav className={styles.nav}>
            <NavLink className={setClass} to={`/profile/${myId}`}>
                Profile
                <FontAwesomeIcon className={styles.icon} icon={faUser} />
            </NavLink>
            <NavLink className={setClass} to="/dialogs">
                Dialogs
                <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
            </NavLink>
            <NavLink className={setClass} to="/users">
                Users
                <FontAwesomeIcon className={styles.icon} icon={faUsers} />
            </NavLink>
            <NavLink className={setClass} to="/news">
                News
                <FontAwesomeIcon className={styles.icon} icon={faNewspaper} />
            </NavLink>
            <NavLink className={setClass} to="/music">
                Music
                <FontAwesomeIcon className={styles.icon} icon={faMusic} />
            </NavLink>
            <NavLink className={setClass} to="/settings">
                Settings
                <FontAwesomeIcon className={styles.icon} icon={faGear} />
            </NavLink>
            {/*<FriendsContainer/>*/}
        </nav>
    );
};


export default Navbar;