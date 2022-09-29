import React, {useEffect, useState} from "react";
import s from '../ProfileInfo.module.css';

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateEditMade = () => {
        setEditMode(true)
    };

    const deactivateEditMade = () => {
        setEditMode(false)
        props.updateStatus(status)
    };

    const changeStatus = (e) => {
        setStatus(e.currentTarget.value)
    };

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    return (
        <div className={s.statusWrap}>
            {editMode ?
                <div className={s.statusInputWrap}>
                    <span>Status:</span>
                    <input autoFocus={true}
                           onChange={changeStatus}
                           onBlur={deactivateEditMade}
                           value={status}/>
                </div> :
                <div className={s.statusSpanWrap}>
                    <span>
                        Status: {status || 'Enter your status'}
                    </span>
                    {props.isOwner && (
                        <div style={{flex: '0 0 70px'}}>
                            <button className={s.btnChange} onClick={activateEditMade}>change status</button>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default ProfileStatus;