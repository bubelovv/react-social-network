import React from 'react';
import s from "./MyButton.module.css";

interface Props {
    onClick?: (e: any) => void
    style?: {}
    children: React.ReactNode
}

const MyButton: React.FC<Props> = ({children, ...props}) => {
    return <button className={s.myButton} {...props}>{children}</button>
};

export default MyButton;