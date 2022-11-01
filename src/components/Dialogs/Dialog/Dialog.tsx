import React from 'react';
import styles from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import {IDialog} from '../../../store/dialogs/types';

const setClass = ({isActive}: { isActive: boolean }) => isActive ? styles.active : '';

interface Props {
    dialog: IDialog;
}

const Dialog: React.FC<Props> = ({dialog}) => {
    return (
        <div className={styles.dialog}>
            <img className={styles.avatar} src={dialog.avatar} alt="avatar"/>
            <NavLink className={setClass} to={`/dialogs/${dialog.id}`}>
                {dialog.name}
            </NavLink>
        </div>
    );
};

export default Dialog;