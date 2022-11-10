import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import avatar from '../../../assets/images/avatar.jpg';
import AboutUserInfo from './AboutUserInfo/AboutUserInfo';
import AboutUserForm from './AboutUserForm/AboutUserForm';
import {IProfile} from '../../../store/profile/types';
import {savePhoto} from '../../../store/profile/profileSlice';
import {useAppDispatch} from '../../../store/store';

interface Props {
    profile: IProfile;
    isOwner: boolean;
}

const ProfileInfo: React.FC<Props> = ({profile, isOwner}) => {
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);

    const mainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files !== null && files[0] !== null) {
            dispatch<void>(savePhoto(files[0]));
        }
    };

    return (
        <div className={s.aboutMe}>
            <div className={s.profilePhoto}>
                <img className={profile.photos.large ? '' : s.circleAvatar} src={profile.photos.large || avatar}
                     alt="bgc"/>

                {isOwner && (
                    <label className={s.customInputFile}>
                        CHANGE
                        <input hidden id="file-upload" type={'file'} onChange={mainPhotoSelected}/>
                    </label>
                )}
            </div>

            {editMode
                ? <AboutUserForm profile={profile} goToEditMode={() => setEditMode(false)}/>
                : <AboutUserInfo profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>
            }
        </div>
    );
};

export default ProfileInfo;