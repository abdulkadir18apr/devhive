import { createContext, useContext, useEffect, useState } from "react";
import { loginService, signupService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [isLogin,setIsLogin]=useState(localStorage.getItem('token')?true:false);
    const [profile,setProfile]=useState({});
    const [user,setUser]=useState({})
    const navigate=useNavigate();

    const userLogin=async (credentials)=>{
        try{
            const response=await loginService(credentials);
            localStorage.setItem('token',response.authToken);
            setIsLogin(()=>true);
            setUser(()=>response.user);
            localStorage.setItem('user',JSON.stringify(response.user));
            navigate("/home");
        }
        catch(err){
            alert("try login again");
         
        }

    }

    const userSignup=async(credentials)=>{
        try{
            const response=await signupService(credentials);
            localStorage.setItem('token',response.authToken);
            setIsLogin(()=>true);
            setUser(()=>response.user);
            localStorage.setItem('user',JSON.stringify(response.user));
            navigate("/home");
            
        }
        catch(err){
            alert("try signup again");
        }
    }

    const logoutUser=()=>{
        setIsLogin(false);
        localStorage.clear();

    }

    useEffect(()=>{
        if(isLogin){
           setUser((JSON.parse(localStorage.getItem('user'))))
        }
    },[])


    return(
        <AuthContext.Provider value={{userLogin,userSignup,isLogin,profile,user,logoutUser,setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext=()=>useContext(AuthContext);