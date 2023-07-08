import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'

import "./css/commentBox.css";
import { useState } from 'react';
import { postCommentService } from '../services/postService';
import { usePostContext } from '../contexts/PostContext';
import { toast } from 'react-toastify';

export default function CommmentBox({setShow,postId}){

    const {user}=useAuthContext();
    const {postDispatch}=usePostContext();
    const [comment,setComment]=useState();
    const picSrc=user?.profile?.profileImage?user?.profile?.profileImage:"https://picsum.photos/200";

    const commentBtnHandler=async()=>{
        if(comment===undefined || comment==="")
        {
            toast("please write something")
        }
        else{
           const res=await postCommentService(postId,comment);
           if(res.success){
            postDispatch({type:"addComment",payload:res.post})
            setShow(false);
            toast("Comment Added")
           }
           else{
            toast("something went wrong");
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
