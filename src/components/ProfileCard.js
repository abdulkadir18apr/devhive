import React, { useState } from 'react'

import "./css/profileCard.css";
import { useAuthContext } from '../contexts/AuthContext';
import { useUserContext } from '../contexts/userContext';
import { EditProfileModal } from './EditProfileModal';
import { useEffect } from 'react';
import { UserModal } from './UserModal';


export default function ProfileCard({profile,setUserProfile}) {

    const [show,setShow]=useState(false);

    const [userModal,setUserModal]=useState({status:false,users:''});

    const {user}=useAuthContext();
    const {followUser,unfollowUser}=useUserContext();
    const  {userId,firstName,lastName,username,bio,portfolio,profileImage,followingCount,followersCount}=profile
    const isLoginUser=userId===user._id;
    const isFollower=user?.following?.some((id)=>id===userId)


    const ProfileBtnClcikHandler=async()=>{
        if(isLoginUser){
            setShow(()=>true);
        }
        else if(isFollower){
            await unfollowUser(userId);
            setUserProfile((prev)=>({...prev,followers:[...prev.followers.filter((id)=>id!==userId)]}))
        }
        else{
            console.log("follow")
            await followUser(userId);
            setUserProfile((prev)=>({...prev,followers:[...prev.followers,userId]}))

        }

    }

    console.log(profile);

    




  return (
    <div className='profile-card'>
        <div className="profile-pic">
            <img src={profileImage} alt="profileImage " srcset="" />
        </div>
        <div className="profileDetails">
            <h1>{firstName}{"  "} {lastName}</h1>
            <p>@{username}</p>
            <p>{bio}</p>
            <a href={portfolio} target="_blank">{portfolio}</a>
            <div className="followersBtn">
            <button onClick={()=>{setUserModal({status:true,users:"followers"})}}>{followersCount} followers</button>
            <button onClick={()=>{setUserModal({status:true,users:"following"})}}>{followingCount} following</button>

            </div>
           
        </div>
        <div className="empty"></div>
        <div className="profileBtn">
            <button className='primaryBtn' onClick={ProfileBtnClcikHandler}>{isLoginUser?"Edit Profile":isFollower?"UnFollow":"Follow"}</button>

        </div>


        {
            show && <EditProfileModal setShow={setShow} profile={profile} />
        }
        {
            userModal.status && <UserModal users={userModal.users==='followers'?profile.followers:profile.following} setUserModal={setUserModal}/>
        }


      
    </div>
  )
}
