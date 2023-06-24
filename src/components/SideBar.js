import React from 'react'

import "./css/sidebar.css";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthContext } from '../contexts/AuthContext';

export function SideBar() {
  const {logoutUser}=useAuthContext();
  return (
    <div className='sidebar'>
        <ul className="navList">
           <NavLink to="/home"><li><FontAwesomeIcon icon="fa-solid fa-house" /><span>Home</span></li></NavLink>
            <NavLink to="/explore"><li><FontAwesomeIcon icon="fa-solid fa-clock" /><span>Explore</span></li></NavLink>
            <NavLink to="/bookmark"><li><FontAwesomeIcon icon="fa-solid fa-bookmark" /><span>Bookmarks</span></li></NavLink>
            <NavLink to="/login" onClick={()=>logoutUser()}><li><FontAwesomeIcon icon="fa-solid fa-right-from-bracket"  /><span>Logout</span></li></NavLink>
        </ul>
    </div>
  )
}


