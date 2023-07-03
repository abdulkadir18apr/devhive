import { createContext, useContext, useEffect, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { useAuthContext } from "./AuthContext";
import { fetchPostService, postDeleteService, postLikeService } from "../services/postService";

export const PostContext=createContext();

export const PostProvider=({children})=>{
    const {isLogin}=useAuthContext()


    const [postState,postDispatch]=useReducer(postReducer,{
        posts:[],
        filter:""
    })

    const fetchPosts=async()=>{
        const res=await fetchPostService();
        if(res.success){
            postDispatch({type:"setPosts",payload:[...res.posts]});
        }
    }

    const filterPost=(posts,filter)=>{
        
        if(filter===""){
            return posts.reverse();
        }
        if(filter==='trending'){
            return posts.sort((a,b)=>b.likes-a.likes);
        }
        if(filter==='latest'){
            return posts.sort((a,b)=>new Date(Date.parse(b.createdAt))-new Date(Date.parse(a.createdAt)));
            
        }
        if(filter==='oldest'){
            return posts.sort((a,b)=>new Date(Date.parse(a.createdAt))-new Date(Date.parse(b.createdAt)));
        }

    }

    const likePost=async(postId)=>{
        const res=await postLikeService(postId);
        if(res){
           postDispatch({type:"likePost",payload:res.post})
        }
    }

    const deletePost=async(postId)=>{
        const res=await postDeleteService(postId);
        if(res.success){
            postDispatch({type:"deletePost",payload:postId})
        }
    }

    const filteredPosts=filterPost([...postState.posts],postState.filter)

    useEffect(()=>{
        if(isLogin){

           fetchPosts();
        }
    },[isLogin])


    return(
    <PostContext.Provider value={{postState,postDispatch,filteredPosts,likePost,deletePost}}>
        {children}
    </PostContext.Provider>)

}

export const usePostContext=()=>useContext(PostContext);