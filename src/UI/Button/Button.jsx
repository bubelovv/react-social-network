import React from 'react';
import s from "./Button.module.css";

const Button = ({activateEditMade, ...props}) => {
    return (
        <div style={{flex: '0 0 70px'}}>
            <button className={s.btnChange} onClick={activateEditMade}>{props.children}</button>
        </div>
    );
};

export default Button;