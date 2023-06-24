import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar';

import "./home.css"
import { SideBar } from '../../components/SideBar';
import { CreatePost } from '../../components/CreatePost';
import { Post } from '../../components/Post';
import { useUserContext } from '../../contexts/userContext';
import { usePostContext } from '../../contexts/PostContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import { SuggestedUser } from '../../components/SuggestedUser';

export  function Home() {

  const {userState}=useUserContext();
  const {postState,filteredPosts,postDispatch}=usePostContext();
  const [settingActive,setSettingActive]=useState(false)
  console.log(filteredPosts);

  const postFilterHandler=(e)=>{
    postDispatch({type:"setFilters",payload:e.target.value});
    setSettingActive(false)
  }

 
  return (
    <div className='home'>
        <Navbar/>
        <div className="home-screen">
          <div className="empty"></div>
      
            <div className="sideNavigation">
              <SideBar/>

            </div>
            <div className="posts">
              <CreatePost/>

              <div className="setting">
                <FontAwesomeIcon icon="fa-solid fa-sliders" onClick={()=>setSettingActive((prev)=>!prev)} />    
              </div>
              <div className={`setting-options ${settingActive?"active":""}`}>
                <button value={"trending"} onClick={postFilterHandler}>Trending</button>
                <button value={"latest"} onClick={postFilterHandler}>Latest</button>
                <button value={"oldest"} onClick={postFilterHandler}>Oldest</button>
              </div>

             {
              filteredPosts.map((post)=>(
                <div>
                  <Post postId={post._id} userId={post.user._id} firstName={post.user.firstName} lastName={post.user?.lastName} content={post.content} postImage={post?.postImage} username={post.user.username} profileImage={post.user?.profile?.profileImage} createdAt={post.createdA} likeCount={post.likes.likeCount} likedBy={post.likes.likedBy} commentsCount={post?.comments?.length} />
                </div>

              ))
              }

            </div>
            <div className="users">
      

              <input type="text" name="" className="search-bar" placeholder='Search users...' />
              <SuggestedUser/>
           

            </div>

            <div className="empty"></div>
         </div>


        
      
    </div>
  )
}
