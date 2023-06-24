import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

import "./css/createPost.css";
import { createPostService } from '../services/postService';
import { usePostContext } from '../contexts/PostContext';
import { useAuthContext } from '../contexts/AuthContext';

export  function CreatePost() {
  const [content,setContent]=useState();
  const [postImage,setPostImage]=useState();
  const [image,setImage]=useState(null);

  const {postDispatch}=usePostContext();
  const {user}=useAuthContext();

  const handleInputChange =(e)=>{
    setContent(()=>e.target.value)

  }
  const handleFileChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      setPostImage(file);
      const reader = new FileReader();
      reader.onload=()=>setImage(reader.result)
      reader.readAsDataURL(file);
    }
    else{
      setImage(null)
    }

  }
  const postSubmitHandler=async()=>{
    const postObj=postImage?{content,postImage}:{content};
    const res=await createPostService(postObj);
    if(res){
      const post={...res.post,user:{...user}}
      postDispatch({type:'addPost',payload:post});
      setPostImage(null);
      setImage(null);
      setContent("");
    }
   
  }

  return (
    <div className='createPost'>
        <div className="avatar">
            <img src="https://picsum.photos/200" alt="PROFILE" srcset="" />
        </div>
        <div className="post-content">
            <textarea name="post" id="" cols="30" rows="5" placeholder='Start Writng Your Ideas' value={content} onChange={handleInputChange} ></textarea>
            {
              image && <img src={image} alt="post" className='postImage' />
            }
            
            <div className="createPost-btn">
            <label htmlFor='postImage'>
           <FontAwesomeIcon icon="fa-solid fa-image" size='2xl' />
           <input type="file" name="postImage" id="postImage" onChange={handleFileChange} />
            </label>
            <button className='primaryBtn' onClick={postSubmitHandler} value={postImage}>Post</button>

            </div>
          
        </div>
      
    </div>
  )
}
