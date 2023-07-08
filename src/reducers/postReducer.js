export const postReducer=(state,action)=>{
    const {type,payload}=action;

    switch(type){

        case "setPosts":
            return{
                ...state,posts:[...payload]
            }
        case 'addPost':
            return{
                ...state,posts:[...state.posts,payload]
            }
        case 'setFilters':
                return{
                    ...state,filter:payload
                }
        case "likePost":
            return {
                ...state,posts:[...state.posts.map((post)=>post._id===payload._id?{...payload}:post)]
            }
        case "addComment":
            return {
                ...state,posts:[...state.posts.map((post)=>post._id===payload._id?{...payload}:post)]
            }
        case "deletePost":
            return {
                ...state,posts:[...state.posts.filter((post)=>post._id!==payload)]
            }
        case "editPost":
            return {
                ...state,posts:[...state.posts.map((post)=>post._id===payload.id?{...payload.post}:post)]
            }

        case "unSetPostLoading":
            return {
                ...state,postLoading:false
            }
        case "setPostLoading":
            return {
                ...state,postLoading:true
            }
        default:
            return state;

    }

}