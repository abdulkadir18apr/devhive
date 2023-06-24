import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'

import "./css/commentBox.css";
import { useState } from 'react';
import { postCommentService } from '../services/postService';
import { usePostContext } from '../contexts/PostContext';

export default function CommmentBox({setShow,postId}){

    const {user}=useAuthContext();
    const {postDispatch}=usePostContext();
    const [comment,setComment]=useState();
    const picSrc=user?.profile?.profileImage?user?.profile?.profileImage:"https://picsum.photos/200";

    const commentBtnHandler=async()=>{
        if(comment===undefined || comment==="")
        {
            alert("please write something")
        }
        else{
           const res=await postCommentService(postId,comment);
           console.log(res)
           if(res.success){
            const payload={...res.post}
            postDispatch({type:"addComment",payload:res.post})
            alert("Comment Added");
            setShow(false);
           }
           else{
            alert("something went wrong");
           }
        
        }
    }

  return (
    <div className='comment-box'>
        <div className="commentBody">
            <img src={picSrc} alt="" />
            <textarea name="comment" id="comment" cols="30" rows="5" placeholder="Write Your comment here....." value={comment} 
            onChange={(e)=>setComment(e.target.value)}></textarea>
        </div>
        <div className="comment-btn">
            <button onClick={()=>setShow(false)}>Cancel</button>
            <button className='primaryBtn' onClick={commentBtnHandler}>Comment</button>
        </div>
      
    </div>
  )
}
