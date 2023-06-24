import { createContext, useContext, useEffect, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { useAuthContext } from "./AuthContext";
import { fetchPostService, postLikeService } from "../services/postService";

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
            return posts;
        }
        if(filter==='trending'){
            return posts.filter((post)=>post.likes?.likeCount>5);
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

    const filteredPosts=filterPost([...postState.posts],postState.filter)

    useEffect(()=>{
        if(isLogin){

           fetchPosts();
        }
    },[isLogin])


    return(
    <PostContext.Provider value={{postState,postDispatch,filteredPosts,likePost}}>
        {children}
    </PostContext.Provider>)

}

export const usePostContext=()=>useContext(PostContext);