import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const setClass = navData => navData.isActive ? s.active : ' ';

const DialogItem = props => {
    const path = '/messages/' + props.id;

    return (
        <div className={s.dialog}>
            <NavLink className={setClass} to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;