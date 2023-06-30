import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useUserContext } from '../contexts/userContext';

import { UserDetails } from './UserDetails';


export  function SearchUser() {
    const [searchQuery,setSearchQuery]=useState("");
    const {userState}=useUserContext();
    const {users}=userState;
    const [searchRes,setSearchRes]=useState([])

    const SearchUsers=()=>{
        return ( users.filter((user)=>user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.username.includes(searchQuery)));
    }

    useEffect(()=>{
       
        setSearchRes(SearchUsers());   
        if(searchQuery===""){
            setSearchRes([])
        }   
    },[searchQuery])

    console.log(searchRes);
  return (
    <div className='search-user'>
         <input type="text" name="" className="search-bar" placeholder='Search users...' onChange={(e)=>setSearchQuery(e.target.value)} />
         <div className="searchResult">
            {
                searchRes.map((user)=>(
                    <div key={user._id}>
                        <UserDetails user={user}/>
                    </div>
            
                ))
            }
         </div>
      
    </div>
  )
}
