import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const setClass = navData => navData.isActive ? s.active : ' ';

const DialogItem = ({dialog}) => {
    const path = '/dialogs/' + dialog.id;

    return (
        <div className={s.dialog}>
            <img className={s.avatar}
                 src={dialog.avatar}
                 alt='avatar'/>
            <NavLink className={setClass} to={path}>{dialog.name}</NavLink>
        </div>
    )
}

export default DialogItem;