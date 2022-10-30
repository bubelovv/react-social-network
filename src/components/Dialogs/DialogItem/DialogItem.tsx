import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {DialogType} from "../../../store/dialogsReducer";

// const setClass = navData => navData.isActive ? s.active : ' ';

interface Props {
    dialog: DialogType
}

const DialogItem: React.FC<Props> = ({dialog}) => {
    return (
        <div className={s.dialog}>
            <img className={s.avatar}
                 src={dialog.avatar}
                 alt='avatar'/>
            <NavLink className={s.active} to={`/dialogs/${dialog.id}`}>{dialog.name}</NavLink>
        </div>
    )
}

export default DialogItem;