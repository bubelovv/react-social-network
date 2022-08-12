import React from 'react';
import s from './Messages.module.css';
import {NavLink} from "react-router-dom";

// const setClass = ({isActive}) => isActive ? s.active : s.dialog;

const Messages = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                <div className={s.dialog + ' ' + s.active}>
                    <NavLink to='/messages/1'>Bubelov</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/messages/2'>Darinka</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/messages/3'>Aleksey</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/messages/4'>Manga</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/messages/5'>Ilysha</NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>I will work in it-industry</div>
                <div className={s.message}>I wait you so much, Lubimka</div>
                <div className={s.message}>What timme will you come to me?</div>
                <div className={s.message}>I don't know, we will in the ocean or not...</div>
            </div>
        </div>
    );
};

export default Messages;