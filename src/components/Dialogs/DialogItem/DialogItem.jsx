import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const setClass = navData => navData.isActive ? s.active : ' ';

const DialogItem = props => {
    const path = '/dialogs/' + props.dialog.id;

    return (
        <div className={s.dialog}>
            <img className={s.avatar}
                 src={props.dialog.avatar}
                 alt='avatar'/>
            <NavLink className={setClass} to={path}>{props.dialog.name}</NavLink>
        </div>
    )
}

export default DialogItem;