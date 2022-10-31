import React from 'react';
import s from '../Dialogs.module.css';
import {Link} from 'react-router-dom';
import {IDialog} from "../../../store/dialogs/types";

// const setClass = navData => navData.isActive ? s.active : ' ';

interface Props {
    dialog: IDialog
}

const DialogItem: React.FC<Props> = ({dialog}) => {
    return (
        <div className={s.dialog}>
            <img className={s.avatar}
                 src={dialog.avatar}
                 alt='avatar'/>
            <Link className={s.active} to={`/dialogs/${dialog.id}`}>{dialog.name}</Link>
        </div>
    )
}

export default DialogItem;