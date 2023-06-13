import { createContext, useContext, useState } from "react";
import { loginService, signupService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [isLogin,setIsLogin]=useState([]);
    const [profile,setProfile]=useState({});
    const navigate=useNavigate();

    const userLogin=async (credentials)=>{
        try{
            const response=await loginService(credentials);
            const res=response.data;
            if(res.encodedToken){
                const {username,firstName,lastName}=res.foundUser;
                localStorage.setItem('encodedToken',res.encodedToken);
                setIsLogin(true);
                setProfile(()=>({username,firstName,lastName}));
                navigate("../home")
            }
        }
        catch(err){
            alert("try login again");
         
        }

    }

    const userSignup=async(credentials)=>{
        try{
            const res=await signupService(credentials);
            if(res.data.encodedToken){
                const {username,firstName,lastName}=res.data.createdUser;
                localStorage.setItem('encodedToken',res.data.encodedToken);
                localStorage.setItem('username',res.data.username);
                setIsLogin(true);
                setProfile(()=>({username,firstName,lastName}));
                navigate("../home");
            }
        }
        catch(err){
            alert("try signup again");
        }
    }

    return(
        <AuthContext.Provider value={{userLogin,userSignup,isLogin,profile}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext=()=>useContext(AuthContext);