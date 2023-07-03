import React from 'react'
import { Navbar } from '../../components/Navbar'
import { SideBar } from '../../components/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Post } from '../../components/Post'
import { useUserContext } from '../../contexts/userContext'
import { useAuthContext } from '../../contexts/AuthContext'
import { usePostContext } from '../../contexts/PostContext'
import { Link, NavLink, useParams } from 'react-router-dom'
import { SuggestedUser } from '../../components/SuggestedUser'
import ProfileCard from '../../components/ProfileCard'
import { useState } from 'react'
import { fetchUserFollowers, fetchUserFollowersService, fetchUserService } from '../../services/userService'
import { useEffect } from 'react'
import { getUSerPostService } from '../../services/postService'
import { SearchUser } from '../../components/SearchUser'

export  function Profile() {

    const {userId}=useParams();
   
    const {user}=useAuthContext();
    const {users}=useUserContext();
    const [userProfile,setUserProfile]=useState(!userId?user:[]);
    const [userPost,setUserPost]=useState([]);
    const [followers,setFollowers]=useState([]);
    const [following,setFollowing]=useState([]);


    const fetchUserProfile=async()=>{
        const res=await fetchUserService(userId);
        if(res.success){
            setUserProfile(()=>res.user);
        }
    }

    const fetchUserPost=async()=>{
        const res=await getUSerPostService(userId);
        if(res.success){
            setUserPost(()=>res.posts);
        }
    }
    const fetchuserFollowers=async()=>{
        const res=await fetchUserFollowersService(userId);
        if(res.success){
            setFollowers(()=>res.user.followers);
            setFollowing(()=>res.user.following);
        }
        else{
            alert('cannot fetch followers');
        }
    }

    useEffect(()=>{
        if(userId!==undefined){
            fetchUserProfile();
        }
    },[userId,user])

    useEffect(()=>{
        fetchUserPost();
    },[userId,user])

    useEffect(()=>{
        console.log("FECTHING..")
        fetchuserFollowers();
    },[userId,users])


    const profile={
        userId:userProfile._id,
        firstName:userProfile.firstName,
        lastName:userProfile.lastName,
        username:userProfile.username,
        bio:userProfile?.profile?.bio?userProfile.profile.bio:"An Enthusiactic Developer",
        portfolio:userProfile?.profile?.portfolio,
        profileImage:userProfile?.profile?.profileImage?userProfile.profile.profileImage:"https://picsum.photos/200",
        followingCount:userProfile?.following?.length,
        followersCount:userProfile?.followers?.length,
        following:following,
        followers:followers,
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
                    <div className="head">
                    <NavLink to="/home"><FontAwesomeIcon icon="fa-solid fa-arrow-left" className='arrowIcon' /></NavLink>
                    <div>
                    <p>{profile.firstName} {profile.lastName}</p>
                    <p>{userPost.length} post</p>
                    </div>
                  
                    </div>
                    <ProfileCard profile={profile} setUserProfile={setUserProfile}/>

                    <div className="userPosts">
                        {
                            userPost.map((post)=>(
                                <div>
                                <Post postId={post._id} userId={post.user._id} firstName={post.user.firstName} lastName={post.user?.lastName} content={post.content} postImage={post?.postImage} username={post.user.username} profileImage={post.user?.profile?.profileImage} createdAt={post.createdAt} likeCount={post.likes.likeCount} likedBy={post.likes.likedBy} commentsCount={post?.comments?.length} />
                              </div>

                            )).reverse()
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
