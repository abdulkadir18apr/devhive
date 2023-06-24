
 const host="https://dev-hive-backend.vercel.app";

export const loginService=async(credentials)=>{
    try{
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error('Login failed');
          } 

          return data;
        
    }
    catch(err){
        console.log(err);

    }

}
export const signupService=async(credentials)=>{
    try{
        const response = await fetch(`${host}/api/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                username: credentials.username,
                password: credentials.password,
            }),
          });

        
          const data = await response.json();

          if (!response.ok) {
            throw new Error('Login failed');
          }
      

          return data;
        
    }
    catch(err){
        console.log(err);

    }
}