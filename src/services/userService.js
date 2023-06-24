
const host="https://dev-hive-backend.vercel.app";

export const userService=async()=>{
    try{
        const response = await fetch(`${host}/api/users`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error('Cant fetch users');
          } 

          return data;
        
    }
    catch(err){
        console.log(err);

    }
}



export const userFollowService=async(userId)=>{
    try{
        const response = await fetch(`${host}/api/users/follow/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const data = await response.json();
          return data;
    }
    catch(err){
        console.log(err);

    }

}
export const userUnfollowService=async(userId)=>{
    try{
        const response = await fetch(`${host}/api/users/unfollow/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const data = await response.json();
          return data;
    }
    catch(err){
        console.log(err);

    }

}
export const fetchUserService=async(userId)=>{
    try{
        const response = await fetch(`${host}/api/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const data = await response.json();
          return data;
    }
    catch(err){
        console.log(err);
    }

}

export const updateProfileService=async(profileObj)=>{
  const formData=new FormData();
  if(!(typeof profileObj.profileImage ==='string')){
    formData.append('profile-image',profileObj.profileImage);
  }
 
  formData.append('firstName',profileObj.firstName);
  formData.append('lastName',profileObj.lastName);
  formData.append('bio',profileObj.bio);
  formData.append('portfolio',profileObj.portfolio);
    try{
        const response = await fetch(`${host}/api/users/profile`, {
            method: 'POST',
            headers: {
              'auth-token':localStorage.getItem('token')
            },
            body:formData,
          });
          const data = await response.json();
          return data;
    }
    catch(err){
        console.log(err);

    }

}


