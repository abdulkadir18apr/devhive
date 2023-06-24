import React from 'react'
import { useUserContext } from '../contexts/userContext'
import { NavLink } from 'react-router-dom';


export  function SuggestedUser() {
    const {userState,followUser}=useUserContext();

    const followBtnClcikHandler=async(e)=>{
        await followUser(e.target.value);
    }

  return (
    <div className="user-suggetion">
    <h1>Suggested users</h1>
    {
      userState.suggestedUser.map((user)=>(
        <div className="user-details">
        <div className="user">
        <NavLink to={`/profile/${user._id}`}><img src={user?.profile?.profileImage?user.profile.profileImage:"https://picsum.photos/200"} alt="user-profile" srcset="" /></NavLink>
        <div className="userName">
        <p>{user.firstName}{"  "}{user.lastName}</p>
         <NavLink to={`/profile/${user._id}`}><p>@{user.username}</p></NavLink>
        </div>

        </div>
        <button className='primaryBtn followBtn' value={user._id} onClick={followBtnClcikHandler}>Follow</button>
      </div>

      ))
    }

    
    </div>
  )
}
