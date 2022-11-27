import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUsers, faMusic, faGear, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope, faNewspaper,} from '@fortawesome/free-regular-svg-icons';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getFriends} from '../../store/sidebar/sidebarSlice';
import Friends from './Friends/Friends';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const friends = useAppSelector(state => state.sidebar.friends);
    const myId = useAppSelector(state => state.auth.id);
    const isAuth = useAppSelector(state => state.auth.isAuth);

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

    useEffect(() => {
        dispatch(getFriends({currentPage: 1, pageSize: 6, term: '', friend: 'true'}));
    }, [isAuth]);

    return (
        <div className={styles.navbar}>
            <nav className={styles.nav}>
                {navbarLinks.map(link =>
                    <NavLink key={link.path} className={setClass} to={link.path}>
                        {link.innerText}
                        <FontAwesomeIcon className={styles.icon} icon={link.icon}/>
                    </NavLink>
                )}
            </nav>
            <Friends friends={friends}/>
        </div>
    );
};


export default Sidebar;