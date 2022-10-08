import React from 'react';
import s from "./Button.module.css";

interface Props {
    goToEditMode: () => void
    children: React.ReactNode
}

const Button: React.FC<Props> = ({goToEditMode, ...props}) => {
    return (
        <div style={{flex: '0 0 70px'}}>
            <button className={s.btnChange} onClick={goToEditMode}>{props.children}</button>
        </div>
    );
};

export default Button;