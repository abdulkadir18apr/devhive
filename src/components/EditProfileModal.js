import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

import "./css/editProfileModal.css";
import { updateProfileService } from '../services/userService';
import { useAuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Avatar } from './Avartar';



export function EditProfileModal({ setShow, profile }) {

    const { setUser } = useAuthContext();
    const { userId, firstName, lastName, bio, profileImage, portfolio } = profile
    const [profileInput, setProfileInput] = useState({ userId, firstName, lastName, portfolio, profileImage, bio });
    const [profilePic, setProfilePic] = useState(profileImage);
    const [showMenu, setShoeMenu] = useState(false);
    const [showAvatar,setShowAvatar]=useState(false);

    const profileInputChangeHandler = (e) => {
        setProfileInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const profileSaveHandler = async () => {
        const res = await updateProfileService(profileInput);
        if (res.success) {
            setUser(() => res.user);
            localStorage.setItem('user', JSON.stringify(res.user));
            toast("Profile Updated")
            setShow(() => false);

        }
        else {
            toast("something went wrong")
        }

    }

    const handleAvartarChange=(avatarFile,avatarImage)=>{
        setProfileInput((prev)=>({...prev,profileImage:avatarFile}));
        setProfilePic(avatarImage);
    }

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setProfileInput((prev) => ({ ...prev, profileImage: file }))
        const reader = new FileReader();
        reader.onload = (e) => {
            setProfilePic(e.target.result);
        };

        reader.readAsDataURL(file);

    }

    const onClose=()=>{
        setShowAvatar(false);
    }
    const isOpen=()=>{
        setShowAvatar(true)
    }

    return (
        <div className='edit-profile'>
            {
                showAvatar && <Avatar isOpen={isOpen} onClose={onClose} handleAvartarChange={handleAvartarChange}/>
            }
            <div className="edit-btn">
                <FontAwesomeIcon icon="fa-solid fa-xmark editIcon" onClick={() => setShow(false)} size='xl' color="purple" style={{ cursor: "pointer" }} />
                <p>Edit Profile</p>
                <button className="primaryBtn" onClick={profileSaveHandler}>Save</button>
            </div>
            <div className="profileImage">
                <img src={profilePic} alt="profile" />

                <FontAwesomeIcon icon="fa-solid fa-camera" id='cameraIcon' onClick={() => setShoeMenu((prev) => !prev)} />
                {showMenu && <div className='upload-menu'>
                    <label htmlFor='profileImage'>
                        <li>Upload a picture</li>
                    </label>
                    <li onClick={isOpen}>Chose from Avatar</li>
                    
                </div>}

                <input type="file" name="profileImage" id="profileImage" onChange={handleProfileImageChange} />
            </div>

            <div className="edit-feilds">
                <label htmlFor="firstName">
                    <span>FirstName</span>
                    <input type="text" name="firstName" id="firstName" value={profileInput.firstName} onChange={(e) => profileInputChangeHandler(e)} />
                </label>
                <label htmlFor="lastName">
                    <span>LastName</span>
                    <input type="text" name="lastName" id="lastName" value={profileInput.lastName} onChange={(e) => profileInputChangeHandler(e)} />
                </label>
            </div>
            <div className="edit-feilds">

                <label htmlFor="portfolio">
                    <span>Portfolio</span>
                    <input type="text" name="portfolio" id="portfolio" value={profileInput.portfolio} onChange={(e) => profileInputChangeHandler(e)} />
                </label>
            </div>
            <div className="edit-feilds">
                <label htmlFor="bio">
                    <span>Bio</span>
                    <input type="text" name="bio" id="bio" cols={10} rows={4} value={profileInput.bio} onChange={(e) => profileInputChangeHandler(e)} />
                </label>
            </div>
        </div>
    )
}
