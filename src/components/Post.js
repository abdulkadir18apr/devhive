import React from 'react'

import  "./css/post.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePostContext } from '../contexts/PostContext';
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { postAddBookmarkService, postRemoveBookmarkService } from '../services/postService';
import CommmentBox from './CommmentBox';
import { Link, NavLink } from 'react-router-dom';

export  function Post({postId,userId,firstName,lastName,username,createdAt,content,postImage,profileImage,commentsCount,likedBy}) {

    const {likePost}=usePostContext();
    const {user,setUser}=useAuthContext();
    const [isLiked,setisLiked]=useState(likedBy.some((id)=>id===user._id));
    const [show,setShow]=useState(false)

    const postInBookmark=(postId)=>{
        return user.bookmarks.includes(postId);
    }

    

    const likePostClickHandler=async()=>{
        await likePost(postId);
        setisLiked(true);
    }
    const bookmarkClickHandler=async()=>{
        if(postInBookmark(postId)){
            const res=await postRemoveBookmarkService(postId);
            if(res.success){
                setUser(()=>res.user);
                localStorage.setItem('user',JSON.stringify(res.user));
            }

        }
        else{
            const res=await postAddBookmarkService(postId);
            if(res.success){
                setUser(()=>res.user);
                localStorage.setItem('user',JSON.stringify(res.user));
              
            }

        }
    }

  return (
    <div className='postFeed'>
        <div className="post-head">
            <div className="profile-pic">
                <NavLink to={`/profile/${userId}`}><img src={profileImage?profileImage:"https://picsum.photos/200"} alt="profile" srcset="" /></NavLink>
                <div className="user">
                <p>{firstName}{"  "} {lastName}  <span>{createdAt?.split('T')[0]}</span> </p>
                <NavLink to={`/profile/${userId}`}><p className='userName'>@{username}</p></NavLink>
            </div>
            </div>
            <div className="options">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
            </div>
        </div>
          <div className="postLink">
            <Link to={`/post/${postId}`}>
              <div className="post-content">
                  <p>{content}</p>
              </div>
              <div className="post-image">
                  {postImage && <img src={postImage} alt="post" srcset="" />}
              </div>
              </Link>
          </div>

        {
            show && <CommmentBox setShow={setShow} postId={postId} />
        }


       
        <div className="post-controls">
        <p><FontAwesomeIcon icon={`fa-${isLiked?"solid":"regular"} fa-heart`} onClick={likePostClickHandler} /><span className='likeCount'>{likedBy.length}</span></p>
        <p><FontAwesomeIcon icon="fa-solid fa-comment" onClick={()=>setShow(true)}/><span className='likeCount'>{commentsCount}</span></p>
        <p><FontAwesomeIcon icon={ `fa-${postInBookmark(postId)?"solid":"regular"} fa-bookmark`} onClick={bookmarkClickHandler} /></p>
        </div>
      
    </div>
  )
}