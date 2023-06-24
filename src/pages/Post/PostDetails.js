import React from 'react'
import { Navbar } from '../../components/Navbar'
import { SideBar } from '../../components/SideBar'
import { Post } from '../../components/Post'
import { useUserContext } from '../../contexts/userContext'
import { usePostContext } from '../../contexts/PostContext'
import { useParams } from 'react-router-dom'

export function PostDetails() {

    const {userState}=useUserContext();
    const {postState}=usePostContext();
    const {id}=useParams();
    const post=postState.posts.find(({_id})=>_id===id);
    const comments=post?.comments.map((comment)=>{
        const user=userState.users.find((user)=>user._id===comment.user);
        return {
            firstName:user.firstName,lastName:user.lastName,username:user.username,profileImage:user?.profile?.profileImage,content:comment.content
        }
    }).reverse()
    return (
        <div className='home'>
            <Navbar/>
            <div className="home-screen">
              <div className="empty"></div>
          
                <div className="sideNavigation">
                  <SideBar/>
    
                </div>
                <div className="posts">

                    <div>
                      <Post postId={post._id} userId={post.user._id} firstName={post.user.firstName} lastName={post.user?.lastName} content={post.content} postImage={post?.postImage} username={post.user.username} profileImage={post?.user?.profile?.profileImage} createdAt={post.createdAt} likeCount={post.likes.likeCount} likedBy={post.likes.likedBy} commentsCount={post.comments.length} />
                    </div>
                    <div className="comments">
                        <h1>{comments.length} Comments</h1>
                        {
                            comments.map(({firstName,lastName,username,profileImage,content})=>(
                                <div className="commentBox">
                                <img src={!profileImage?"https://picsum.photos/200/":profileImage} alt="profileImage" />
                                    <div className="commentBox-body">
                                        <h1>{firstName}{"   "}{lastName} <span>@{username}</span></h1>
                                        <p>{content}</p>
                                    </div>
                                </div>

                            ))
                        }
                       
                    </div>
                    
                </div>
                <div className="users">
          
    
                  <input type="text" name="" className="search-bar" placeholder='Search users...' />
                  <div className="user-suggetion">
                  <h1>Suggested users</h1>
                  {
                    userState.suggestedUser.map((user)=>(
                      <div className="user-details">
                      <div className="user">
                      <img src={user?.profile?.profileImage?user.profile.profileImage:"https://picsum.photos/200"} alt="user-profile" srcset="" />
                      <div className="userName">
                      <p>{user.firstName}{"  "}{user.lastName}</p>
                       <p>@{user.username}</p>
                      </div>
    
                      </div>
                      <button className='primaryBtn followBtn'>Follow</button>
                    </div>
    
                    ))
                  }
    
                  
                  </div>
    
                </div>
    
                <div className="empty"></div>
             </div>
    
    
            
          
        </div>
      )
}
