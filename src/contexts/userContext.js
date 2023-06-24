import { createContext, useContext, useEffect, useReducer } from "react";
import { userFollowService, userService, userUnfollowService } from "../services/userService";
import { userReducer } from "../reducers/userReducer";
import { useAuthContext } from "./AuthContext";

export const userContext=createContext();

export const UserProvider=({children})=>{

    const {isLogin,user,setUser}=useAuthContext();

    const [userState,userDispatch]=useReducer(userReducer,{
        users:[],
        suggestedUser:[]
    })


    const fetchUsers=async()=>{
        const res=await userService();
        const users=res?.users;
        
        userDispatch({type:"setUsers",payload:[...users]})
    }

    const followUser=async(userId)=>{
        const res=await userFollowService(userId);
        if(res.success){
            setUser(res.user);
            localStorage.setItem('user',JSON.stringify(res.user));
            userDispatch({type:"updateUsers",payload:{user:res.user,followedUser:res.userTobeFollowed}});
        }
    }
    const unfollowUser=async(userId)=>{
        const res=await userUnfollowService(userId);
        if(res.success){
            setUser(res.user);
            localStorage.setItem('user',JSON.stringify(res.user));
            userDispatch({type:"updateUsers",payload:{user:res.user,followedUser:res.userTobeunFollowed}});
        }
    }

    useEffect(()=>{
        if(isLogin){
            fetchUsers();
        }

    },[isLogin])

    useEffect(()=>{
        if(isLogin && Object.keys(user).includes("following")){
            userDispatch({type:"setSuggestedUser" ,payload:[user._id,...user.following]})
        }
    },[userState.users])

    
    return(
        <userContext.Provider value={{userState, userDispatch,followUser,unfollowUser}}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext=()=>useContext(userContext);