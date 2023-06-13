import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import logo from "../../assets/devHive/devHiveLogo.png"
import { NavLink, useNavigate } from 'react-router-dom';

import "./landingPage.css"


export function LandingPage() {
    const navigate=useNavigate();

    return (
        <div className='landing-page'>
            <div className="landing-page-container">
                <div className="landing-page-content">
                    <h1>Building a Hive of Coding Excellence</h1>
                    <p>
                        Connect with like-minded developers, share ideas, and accelerate your coding journey at DevHive. Join a vibrant community where innovation thrives and collaboration fuels your tech aspirations. Unleash your potential and shape the future of software development with DevHive.
                    </p>
                    <button className='primaryBtn' onClick={()=>{navigate("/signup")}}>Join Now <FontAwesomeIcon icon="fa-solid fa-arrow-right" size='lg'/> </button>
                    <NavLink to="/login">Already Have a Account?</NavLink>
                </div>
                <div className="devHive-logo">
                    <img src={logo} alt="devHive Logo" />
                </div>
            </div>

        </div>
    )
}
