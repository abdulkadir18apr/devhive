import React from 'react'
import { Navbar } from '../../components/Navbar'
import { SideBar } from '../../components/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Post } from '../../components/Post'
import { useUserContext } from '../../contexts/userContext'
import { useAuthContext } from '../../contexts/AuthContext'
import { usePostContext } from '../../contexts/PostContext'
import { Link } from 'react-router-dom'
import { SuggestedUser } from '../../components/SuggestedUser'
import { SearchUser } from '../../components/SearchUser'

export  function Bookmark() {

    const {userState}=useUserContext();
    const {user} = useAuthContext();
    const {filteredPosts}=usePostContext();
    const bookmarkPost=filteredPosts.filter(({_id})=>user.bookmarks.includes(_id)) 

    return (
        <div className='home'>
            <Navbar/>
            <div className="home-screen">
              <div className="empty"></div>
          
                <div className="sideNavigation">
                  <SideBar/>
    
                </div>
                <div className="posts">
                    <h1>Bookmark</h1>
                 {
                  bookmarkPost.map((post)=>(
                    <div>
                        
                      <Post postId={post._id} userId={post.user._id} firstName={post.user.firstName} lastName={post.user?.lastName} content={post.content} postImage={post?.postImage} username={post.user.username} profileImage={post.user?.profile?.profileImage} createdAt={post.createdAt} likeCount={post.likes.likeCount} likedBy={post.likes.likedBy} commentsCount={post?.comments?.length} />
                  
                    </div>
    
                  ))
                  }
    
                </div>
                <div className="users">
          
    
                 <SearchUser/>
                  <SuggestedUser/>
    
                </div>
    
                <div className="empty"></div>
             </div>
    
    
            
          
        </div>
      )
}
