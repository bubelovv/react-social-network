import React from 'react';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUsers, faMusic, faGear, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope, faNewspaper,} from '@fortawesome/free-regular-svg-icons';
import styles from './Navbar.module.css';
import {useAppSelector} from '../../store/store';
// import FriendsContainer from "./Friends/FriendsContainer";

const Navbar = () => {
    const myId = useAppSelector(state => state.auth.id);

    const setClass = ({isActive}: { isActive: boolean }) => isActive ? styles.active : '';

    interface navbarLink {
        path: string,
        innerText: string,
        icon: IconDefinition,
    }

    const navbarLinks: navbarLink[] = [
        {path: `/profile/${myId}`, innerText: 'Profile', icon: faUser},
        {path: `/dialogs`, innerText: 'Dialogs', icon: faEnvelope},
        {path: `/users`, innerText: 'Users', icon: faUsers},
        {path: `/news`, innerText: 'News', icon: faNewspaper},
        {path: `/music`, innerText: 'Music', icon: faMusic},
        {path: `/settings`, innerText: 'Settings', icon: faGear},
    ];

    return (
        <nav className={styles.nav}>
            {navbarLinks.map(link =>
                <NavLink key={link.path} className={setClass} to={link.path}>
                    {link.innerText}
                    <FontAwesomeIcon className={styles.icon} icon={link.icon}/>
                </NavLink>
            )}

            {/*<FriendsContainer/>*/}
        </nav>
    );
};


export default Navbar;