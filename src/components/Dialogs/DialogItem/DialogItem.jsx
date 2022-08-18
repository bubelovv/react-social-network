import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const setClass = navData => navData.isActive ? s.active : ' ';

const DialogItem = props => {
    const path = '/messages/' + props.state.id;

    return (
        <div className={s.dialog}>
            <img className={s.avatar}
                 src={props.state.avatar}
                 alt='avatar'/>
            <NavLink className={setClass} to={path}>{props.state.name}</NavLink>
        </div>
    )
}

export default DialogItem;