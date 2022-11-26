import React, {useEffect, useState} from 'react';
import s from './ProfileStatus.module.css';
import MyButton from '../../../UI/MyButton/MyButton';
import {updateStatus} from '../../../store/profile/profileSlice';
import {useAppDispatch} from '../../../store/store';

interface Props {
    status: string;
    isOwner: boolean;
}

const ProfileStatus: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();

    let [editMode, setEditMode] = useState<boolean>(false);
    let [status, setStatus] = useState<string>(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = async () => {
        await dispatch(updateStatus(status));
        setEditMode(false);
    };

    const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (
        <div className={s.statusWrap}>
            {editMode
                ? <div className={s.statusInputWrap}>
                    <span>Status:</span>
                    <input autoFocus={true}
                           onChange={changeStatus}
                           onBlur={deactivateEditMode}
                           value={status}/>
                    <MyButton onClick={deactivateEditMode}>save</MyButton>
                </div>
                : <div className={s.statusSpanWrap}>
                    <span>Status:</span>
                    <p>{status || 'Enter your status'}</p>
                    {props.isOwner && (
                        <MyButton onClick={activateEditMode}>change</MyButton>
                    )}
                </div>
            }
        </div>
    );
};

export default ProfileStatus;