import React from 'react'

import "./css/navbar.css"
import logo from "../assets/devHive/devHiveLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserContext } from '../contexts/userContext';
import { useAuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';

export  function Navbar() {
  const {user}=useAuthContext();
  const {isDark,toggleTheme}=useThemeContext();
  return (
    <div className='navbar'>
        <div className="navbar-center">
        <h3>DevHive</h3>
        <p>Building a Hive of Coding Excellence</p>
        </div>

        <div className="navbar-profile">
        <button className='themeIcon'><FontAwesomeIcon icon={`fa-solid fa-${isDark?"sun":"moon"} icon`} onClick={()=>toggleTheme()} /></button>
        <NavLink to={`/profile/${user._id}`}><img src={user?.profile?.profileImage?user?.profile?.profileImage:"https://picsum.photos/200"} alt="profile" srcset="" /></NavLink>
        </div>
    </div>
  )
}
