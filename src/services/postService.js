

const host="https://dev-hive-backend.vercel.app";

export const fetchPostService=async()=>{
    try{
        const response = await fetch(`${host}/api/posts`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            }
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error('fetch post services failed ');
          } 

          return data;
        
    }
    catch(err){
        console.log(err);

    }

}


export const createPostService=async(postObj)=>{

    const formData=  new FormData();
    formData.append('content', postObj.content);
    if(postObj.postImage){
        formData.append('post-image', postObj.postImage);
    }

    try{
        const response = await fetch(`${host}/api/user/post`, {
            method: 'POST',
            headers: {
              
              'auth-token':localStorage.getItem('token')
            },
            body:formData
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error('fetch post services failed ',response);
          } 

          return data;
        
    }
    catch(err){
        console.log(err);

    }

}

export const postLikeService=async(postId)=>{

 
    try{
        const response = await fetch(`${host}/api/posts/like/${postId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
          });
          const data = await response.json();

          if (!response.ok) {
            throw new Error('fetch post services failed ',response);
          } 

          return data;
        
    }
    catch(err){
        console.log(err);

    }

}



export const postAddBookmarkService=async(postId)=>{
  console.log(postId)
    try{
        const response = await fetch(`${host}/api/users/bookmark/${postId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            }
          });

          const data = await response.json();

         

          return data;
        
    }
    catch(err){
        console.log(err);

    }
}

export const postRemoveBookmarkService=async(postId)=>{
    try{
        const response = await fetch(`${host}/api/users/remove-bookmark/${postId}`, {
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


export const postFetchBookmarkService=async()=>{
    try{
        const response = await fetch(`${host}/api/users/bookmark/fetch-bookmark/`, {
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



export const postCommentService=async(postId,content)=>{
  const bodyObj={content:content};
    try{
        const response = await fetch(`${host}/api/posts/comment/${postId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify(bodyObj),
          });
          const data = await response.json();
          return data;
    }
    catch(err){
        console.log(err);

    }
}
export const getUSerPostService=async(userId)=>{
  
    try{
        const response = await fetch(`${host}/api/posts/user/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            }
          });
          const data = await response.json();
          return data;
    }
    catch(err){
        console.log(err);

    }
}


export const postDeleteService=async(postId)=>{
  
    try{
        const response = await fetch(`${host}/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            }
          });
          const data = await response.json();
          return data;
    }
    catch(err){
        console.log(err);

    }
}


//edit postService


export const editPostService=async(postId,postObj)=>{

  const formData=new FormData();
  formData.append('content',postObj.content);
  if(postObj?.postImage){
    formData.append('post-image',postObj.postImage);
  }
  try{
      const response = await fetch(`${host}/api/posts/edit/${postId}`, {
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

