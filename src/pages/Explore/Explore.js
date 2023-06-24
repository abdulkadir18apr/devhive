import React from 'react'
import { Navbar } from '../../components/Navbar'
import { SideBar } from '../../components/SideBar'
import { Post } from '../../components/Post'
import { useUserContext } from '../../contexts/userContext'
import { usePostContext } from '../../contexts/PostContext'
import { Link } from 'react-router-dom'
import { SuggestedUser } from '../../components/SuggestedUser'

export  function Explore() {

    const {userState}=useUserContext();
    const {postState}=usePostContext();
    return (
        <div className='home'>
            <Navbar/>
            <div className="home-screen">
              <div className="empty"></div>
          
                <div className="sideNavigation">
                  <SideBar/>
    
                </div>
                <div className="posts">
                    <h1>Explore</h1>
                 {
                  postState.posts.map((post)=>(
                    <div>
                      <Post postId={post._id} userId={post.user._id} firstName={post.user.firstName} lastName={post.user?.lastName} content={post.content} postImage={post?.postImage} username={post.user.username} profileImage={post.user?.profile?.profileImage} createdAt={post.createdAt} likeCount={post.likes.likeCount} likedBy={post.likes.likedBy} commentsCount={post?.comments?.length} />
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
