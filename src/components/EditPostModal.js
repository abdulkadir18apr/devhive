import React, { useState } from 'react'
import { CreatePost } from './CreatePost'

import "./css/editPostModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export  function EditPostModal({isEdit, setIsEdit,postContent,postPic,postId}) {
  return (
    <div className='editPostModal'>
        <FontAwesomeIcon icon="fa-solid fa-xmark" id='crossIcon' onClick={()=>setIsEdit(false)}/>
        <CreatePost postId={postId} postContent={postContent} isEdit={isEdit} postPic={postPic} setIsEdit={setIsEdit}/>
    </div>
  )
}
