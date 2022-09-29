import React, {useState} from "react";
import s from '../ProfileInfo.module.css';
import avatar from "../../../../assets/images/avatar.jpg";
import AboutUserInfo from "./AboutUserInfo/AboutUserInfo";
import AboutUserForm from "./AboutUserForm/AboutUserForm";

const ProfileUserInfo = ({profile, isOwner, savePhoto, saveInfo}) => {

    const mainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
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