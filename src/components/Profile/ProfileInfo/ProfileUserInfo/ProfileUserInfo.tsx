import React, {useState} from "react";
import s from '../ProfileInfo.module.css';
import avatar from "../../../../assets/images/avatar.jpg";
import AboutUserInfo from "./AboutUserInfo/AboutUserInfo";
import AboutUserForm from "./AboutUserForm/AboutUserForm";
import {FormValues, IProfile} from "../../../../redux/profileReducer";

interface Props {
    profile: IProfile                                       // | null
    isOwner: boolean
    savePhoto: (file: any) => void
    saveInfo: (profile: FormValues, setError: any) => void
}

const ProfileUserInfo: React.FC<Props> = ({profile, isOwner, savePhoto, saveInfo}) => {

    const mainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        console.log(files)
        if (files !== null) {
            savePhoto(files[0])
        }
    }

    const [editMode, setEditMode] = useState(false)

    return (
        <div className={s.aboutMe}>

            <div className={s.profilePhoto}>
                <img src={profile.photos.large || avatar} alt='bgc'/>

                {isOwner && (
                    <label htmlFor="file-upload" className={s.customInputFile}>
                        Change Photo
                        <input hidden id="file-upload" type={"file"} onChange={mainPhotoSelected}/>
                    </label>
                )}
            </div>

            <div className={s.profileInfoWrap}>
                {editMode
                    ? <AboutUserForm profile={profile}
                                     isOwner={isOwner}
                                     goToEditMode={() => setEditMode(false)}
                                     saveInfo={saveInfo}/>
                    : <AboutUserInfo profile={profile}
                                     isOwner={isOwner}
                                     goToEditMode={() => setEditMode(true)}/>
                }
            </div>
        </div>
    )
}

export default ProfileUserInfo;