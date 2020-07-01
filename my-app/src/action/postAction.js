import axios from 'axios'
import * as action from './types'
import isContains from './isCOntain'


export const addPost=postData=>dispatch=>{
    dispatch(setPostLoading())
    axios.post('/api/v1/post/createPost',postData)
    .then(res=>{
        // console.log(res.data)
        dispatch({
            type:action.ADD_POST,
            payload:res.data.post
        })
    }
        ).catch(err=>{
          
            let errors = {}
            let msg = JSON.stringify(err.response.data.message.split('.')[0])
          errors= isContains(errors,msg,'text')
          errors= isContains(errors,msg,'image')
          dispatch({
              type:action.GET_ERRORS,
              payload:errors
          })
        })
}

export const getPosts=()=>dispatch=>{
    dispatch(setPostLoading())
    axios.get('/api/v1/post/getAllPost')
    .then(res=>{
  
        dispatch({
            type:action.GET_POSTS,
            payload:res.data.posts
        })

    }).catch(err=>{
      console.log(err)
    //   console.log(err.response)
    //   console.log('inside action')
        dispatch({
            type:action.GET_POSTS,
            payload:null
        })
     
       
    })
}

export const setPostLoading=()=>{
    return{
        type:action.POST_LOADING
    }
}

export const deletePost = id=>dispatch=>{
    axios.delete(`/api/v1/post/deletePost/${id}`).then(res=>{
        dispatch({
            type:action.DELETE_POST,
            payload:id
        })
    }).catch(err=>console.log(err))
}

export const addLike =id=>dispatch=>{

    axios.post(`/api/v1/post/like/${id}`).then(res=>
        dispatch(getPosts())
        ).catch(err=>{
            // console.log(err.response.data.message)
            dispatch({
                type:action.GET_ERRORS,
                payload:{}
            })
                    })
}
export const unLike =id=>dispatch=>{

    axios.post(`/api/v1/post/unlike/${id}`).then(res=>
        dispatch(getPosts())
        ).catch(err=>{
            // console.log(err.response.data.message)
            dispatch({
                type:action.GET_ERRORS,
                payload:{}
            })
                    })
}

export const getPost=(id)=>dispatch=>{
    dispatch(setPostLoading())
    axios.get(`/api/v1/post/getPost/${id}`).then(res=>{
     
    
        dispatch({
            type:action.GET_POST,
            payload:res.data.post
        })
    }
        ).catch(err=>{
            // console.log(err.response)
            dispatch({
                type:action.GET_POST,
                payload:{}
            })
        })
}

export const addComment=(id,text)=>dispatch=>{
    // console.log(text)
    axios.post(`/api/v1/post/comment/${id}`,text)
    .then(res=>
        dispatch({
            type:action.GET_POST,
            payload:res.data.post
        })
        ).catch(err=>{
            // console.log(err.response)

            dispatch({
                type:action.GET_ERRORS,
                payload:{}
            })
        })
}

export const deleteComment=(commentId,postId)=>dispatch=>{
    axios.delete(`/api/v1/post/deletecomment/${postId}/${commentId}`).then(res=>dispatch({
        type:action.GET_POST,
        payload:res.data.post
    })
    
    ).catch(err=>dispatch({
        type:action.GET_ERRORS,
        payload:{}
    }))
}
