import * as actionType from '../action/types'
const inistialState = {
    posts: [],
    post: {},
    loading: false
};

export default function (state = inistialState, action) {
    switch (action.type) {
        case actionType.DELETE_POST:
            return{
                ...state,
                posts:state.posts.filter(post=>action.payload !== post._id)
            }
        case actionType.ADD_POST:

            return {
                ...state,
                loading:false,
                posts: [action.payload, ...state.posts]
            }
        case actionType.GET_POST:
            return{
                ...state,
                post:action.payload,
                loading:false
            }
        case actionType.POST_LOADING:
            return{
                ...state,
                loading:true
            }
        case actionType.GET_POSTS:
            return{
                ...state,
                posts:action.payload,
                loading:false
            }    

        default:
            return state;
    }
}