import React from 'react'
import { useUserContext } from '../contexts/userContext'
import { UserDetails } from './UserDetails';


export  function SuggestedUser() {
    const {userState}=useUserContext();


  return (
    <div className="user-suggetion">
    <h1>Suggested users</h1>
    {
      userState.suggestedUser.map((user)=>(
       <div>
        <UserDetails user={user}/>
       </div>

      ))
    }
    </div>
  )
}
