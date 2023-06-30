import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useUserContext } from '../contexts/userContext';

export  function UserDetails({user}) {
    const {user:currUser}=useAuthContext();
    const {followUser,unfollowUser}=useUserContext();
    const isFollower=currUser.following.some((id)=>id===user._id);

    
    const followBtnClcikHandler=async(e)=>{

        if(isFollower){
            await unfollowUser(e.target.value)

        }
        else{
            await followUser(e.target.value);

        }
       
    }

  return (
      <div className="user-details">
          <div className="user">
              <NavLink to={`/profile/${user._id}`}><img src={user?.profile?.profileImage ? user.profile.profileImage : "https://picsum.photos/200"} alt="user-profile" srcset="" /></NavLink>
              <div className="userName">
                  <p>{user.firstName}{"  "}{user.lastName}</p>
                  <NavLink to={`/profile/${user._id}`}><p>@{user.username}</p></NavLink>
              </div>

          </div>
          <button className='primaryBtn followBtn' value={user._id} onClick={followBtnClcikHandler}>{isFollower?"Unfollow":"follow"}</button>
      </div>
  )
}
