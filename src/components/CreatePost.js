import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'



import "./css/createPost.css";
import { createPostService, editPostService } from '../services/postService';
import { usePostContext } from '../contexts/PostContext';
import { useAuthContext } from '../contexts/AuthContext';

export function CreatePost({ postId, isEdit=false,setIsEdit , postContent = "", postPic = "" }) {

  const [content, setContent] = useState(isEdit ? postContent : "");
  const [postImage, setPostImage] = useState(isEdit ? postPic : null);
  const [image, setImage] = useState(isEdit ? postPic : null);
  const [dragging, setDragging] = useState(false);
  const [isEmoji,setISEmoji]=useState(false);
  const contentRef=useRef(null)

  

  const { postDispatch } = usePostContext();
  const { user } = useAuthContext();

  const handleInputChange = (e) => {
    setContent(() => e.target.value)

  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result)
      reader.readAsDataURL(file);
    }
    else {
      setImage(null)
    }

  }
  const postSubmitHandler = async () => {
    
    if (!isEdit) {
      const postObj = postImage ? { content, postImage } : { content };
      const res = await createPostService(postObj);
      if (res) {
        const post = { ...res.post, user: { ...user } }
        postDispatch({ type: 'addPost', payload: post });
        setPostImage(null);
        setImage(null);
        setContent("");
      }
    }
    else {
      const postObj=(typeof postImage === 'object' && postImage!==null)?{content,postImage}:{content};
      const  res=await editPostService(postId,postObj);
      if(res.success){
        postDispatch({type:"editPost", payload:{post:res.post,id:postId}})
        setPostImage(null);
        setImage(null);
        setContent("");
        setIsEdit(false);

      }
    }


  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);




    const file = e.dataTransfer.files[0];
    setPostImage(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  }

  const handleRemoveImage = () => {
    setPostImage(null);
    setImage(null)
  }
  const handleEmojiKeyboard=(e)=>{
    e.stopPropagation();
    setISEmoji((prev)=>!prev)
  }

  const emojiSelectHandler=(e)=>{
    const {selectionStart,selectionEnd}=contentRef.current;
    const newContent=content.substring(0,selectionStart) + e.native + content.substring(selectionEnd);
    setContent(()=>newContent);
  }



  return (
    <div className='createPost'>
      <div className="avatar">
        <img src={user?.profile?.profileImage || "https://picsum.photos/200"} alt="PROFILE" srcset="" />
      </div>
      <div className="post-content">
        <textarea  ref={contentRef} name="post" id=""  placeholder='Start Writng Your Ideas' value={content} onChange={handleInputChange} ></textarea>
        <div className={`dropzone ${dragging ? "dragging" : ""}`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} >
      

          {

            image && <div style={{ position: 'relative', display: 'inline-block' }}>
              <img  src={image} alt="post" className='postImage' />
              <FontAwesomeIcon icon="fa-solid fa-xmark" onClick={handleRemoveImage} style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '24px',
                color: 'red',
                cursor: 'pointer',
              }} />
            </div>
          }

          {!image && <p>Drag your Image Here</p>}

        </div>


      


        <div className="createPost-btn">
          <p>Characters: {content.length}</p>
          <p>Words: {content !== "" ? content.trim().split(" ").length : "0"}</p>
          <FontAwesomeIcon icon="fa-solid fa-face-smile" size='xl' onClick={handleEmojiKeyboard}/>
        
        { !isEdit && <label htmlFor='postImage'>
            <FontAwesomeIcon icon="fa-solid fa-image" size='2xl' />
            <input type="file" name="postImage" id="postImage" onChange={handleFileChange} />
          </label>}
          <button className='primaryBtn' onClick={postSubmitHandler} value={postImage}>{isEdit ? "Save" : "Post"}</button>
        </div>
        {isEmoji && <Picker data={data}  onEmojiSelect={emojiSelectHandler}  onClickOutside={()=>setISEmoji(()=>false)} />}
      </div>

    </div>
  )
}
