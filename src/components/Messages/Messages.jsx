import React from 'react';
import s from './Messages.module.css';
import {NavLink} from "react-router-dom";

const setClass = navData => navData.isActive ? s.active : ' ';

const Dialog = props => {
    const path = '/messages/' + props.id

    return (
        <div className={s.dialog}>
            <NavLink className={setClass} to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = props => {
    return <div className={s.message}>{props.message}</div>
}

const Messages = () => {

    let dialogs = [
        {id: '1', name: 'Bubelov'},
        {id: '2', name: 'Darinka'},
        {id: '3', name: 'Aleksey'},
        {id: '4', name: 'Manga'},
        {id: '5', name: 'Ilysha'},
    ]

    let messages = [
        {id: '1', message: 'I will work in it-industry'},
        {id: '2', message: 'I wait you so much, Lubimka'},
        {id: '3', message: 'I do not know, we will in the ocean or not...'},
    ]

    const dialogsElements = dialogs.map(d => <Dialog name={d.name} id={d.id}/>);

    const messagesElements = messages.map(m => <Message message={m.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
            </div>
        </div>
    );
};

export default Messages;