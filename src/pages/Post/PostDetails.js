import React from 'react'
import { Navbar } from '../../components/Navbar'
import { SideBar } from '../../components/SideBar'
import { Post } from '../../components/Post'
import { useUserContext } from '../../contexts/userContext'
import { usePostContext } from '../../contexts/PostContext'
import { NavLink, useParams } from 'react-router-dom'
import { SearchUser } from '../../components/SearchUser'
import { SuggestedUser } from '../../components/SuggestedUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                  <div className="head">

            
                <NavLink to="/home"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className="arrowIcon" /></NavLink>
                    <div>
                    <p>{post?.user?.firstName} {post?.user?.lastName}</p>
                    </div>
                    </div>
      

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
                  <SearchUser/>
                  <SuggestedUser/>
                </div>
    
                <div className="empty"></div>
             </div>
    
    
            
          
        </div>
      )
}
