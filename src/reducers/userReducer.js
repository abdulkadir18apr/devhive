export const userReducer=(state,action)=>{
    const {type,payload}=action;

    switch(type){
        case "setUsers":
            return {
                ...state,users:[...payload]
            }
        case "setSuggestedUser":
            const suggestedUser=state.users.filter(({_id})=>!payload.includes(_id))
            return{
                ...state,suggestedUser:[...suggestedUser]
            }
        case "updateUsers":
            let updatedUsers=state.users.map((user)=>user._id===payload.user._id?{...payload.user}:user)
            updatedUsers=state.users.map((user)=>user._id===payload.followedUser._id?{...payload.followedUser}:user)
            return {
                ...state,users:[...updatedUsers]
            }

        default:
            return state;

    }

}