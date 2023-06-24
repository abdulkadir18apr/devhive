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
        default:
            return state;

    }

}