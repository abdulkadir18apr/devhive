import React from 'react'
import { UserDetails } from './UserDetails'

import "./css/userModal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export  function UserModal({users,setUserModal}) {
  return (
    <div className='userModal'>
         <FontAwesomeIcon icon="fa-solid fa-xmark" onClick={()=>setUserModal({status:false,users:""})} size='xl' color="purple" style={{cursor:"pointer",position:"relative",left:"50%",bottom:"8px"}} />
        <div>
            {
                users.map((user)=>(
                    <div className='user' key={user._id}>
                    <UserDetails user={user}/>
                    </div>
                ))
            }
        </div>
      
    </div>
  )
}
