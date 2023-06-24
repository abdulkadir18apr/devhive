import React, { useState } from 'react'

import "./auth.css";
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export function Login() {
    const location = useLocation();
    const [credentials,setCredentials]=useState({})
    const [isLoginRoute, setIsLoginRoute] = useState(location?.pathname === "/login" ? true : false);
    const {userLogin,userSignup}=useAuthContext();

    const inputChangeHandler=(e)=>{
        setCredentials((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const LoginButtonClickHandler=async(e)=>{
        e.preventDefault();
        if(isLoginRoute){
            await userLogin(credentials) 
            setCredentials({})
        }
        else{
            await userSignup(credentials);
            setCredentials({})
        }
    
    }

    const testLoginClickHandler=async(e)=>{
        e.preventDefault();
        const testCredentials={username:"adarshbalika",password:"adarshBalika123"};
        await userLogin(testCredentials);

    }
    return (
        <div className='login'>
            <div className="login-form">
                <h1>DevHive</h1>
                <h2>Login</h2>
                <form>
                    {
                        !isLoginRoute && <input type="text" name="firstName" id="firstName" placeholder='FIRST-NAME' value={credentials?.firstName} onChange={inputChangeHandler} />
                    }                {
                        !isLoginRoute && <input type="text" name="lastName" id="lastName" placeholder='LAST-NAME' value={credentials?.lastName} onChange={inputChangeHandler} />
                    }
                    <input type="text" name="username" id="username" placeholder='USERNAME' value={credentials?.username} onChange={inputChangeHandler}  />
                    {/* <label htmlFor="password">Password:</label> */}
                    <input type="password" name="password" id="password" placeholder='PASSWORD' value={credentials?.password} onChange={inputChangeHandler} />
                    <button className='primaryBtn' onClick={(e)=>LoginButtonClickHandler(e)}>{isLoginRoute?"Login":"Signup"}</button>
                    <button className='primaryBtn' style={{display:!isLoginRoute && "none"}} onClick={testLoginClickHandler}>{isLoginRoute?"Test Login":"Signup"}</button>
                    <NavLink to={isLoginRoute?"../signup":"../login"} onClick={()=>setIsLoginRoute((val)=>!val)}>{isLoginRoute?"New Here?":"Already a user?"}</NavLink>
                </form>
            </div>
        </div>
    )
}
