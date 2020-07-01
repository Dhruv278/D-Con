import * as action from './types'
import axios from 'axios'
import Cookies from 'js-cookie'
import isContain from './isCOntain'


// get current user profile

export const getCurrentProfile = () => dispatch => {

    axios.get('/api/v1/profile/myprofile')
        .then(res => {

            dispatch({
                type: action.GET_PROFILE,
                payload: res.data.profile
            })
        }

        ).catch(err => {
            // console.log(err.response)
            try {
                const mess = JSON.stringify(err.response.data.message)
                let error = {}
                if (mess.match(/log/)) {
                    error.extra = mess
                    dispatch({
                        type: action.GET_ERRORS,
                        payload: error
                    })
                } else {
                    dispatch({
                        type: action.GET_PROFILE,
                        payload: {}
                    })
                }
            } catch (err) {
                window.location.reload()
            }
        })
}

// create profile
export const createProfile = (data, history) => dispatch => {
    axios.post('/api/v1/profile/createProfile', data)
        .then(res => {
            history.push('/dashboard')

        }).catch(err => {
            let errors = {}
            let msg = JSON.stringify(err.response.data.message.split('.')[0])
            // console.log(msg)
            
           errors=isContain(errors,msg,'handle')
           errors=isContain(errors,msg,'skill')
           errors=isContain(errors,msg,'website')
           errors=isContain(errors,msg,'twitter')
           errors=isContain(errors,msg,'facebook')
           errors=isContain(errors,msg,'instagram')
           errors=isContain(errors,msg,'youtube')
           errors=isContain(errors,msg,'status')
           

            dispatch({
                type: action.GET_ERRORS,
                payload: errors
            })
        })
}

export const setProfileLoading = () => {
    return {
        type: action.PROFILE_LOADING
    }
}


export const removeProfile = () => {
    return {
        type: action.CLEAR_CURRENT_PROFILE
    }
}
export const DeleteProfile = () => dispatch => {
    if (window.confirm('Are you sure to delete your profile?')) {
        axios.delete('/api/v1/profile/deleteProfile')
            .then(res =>
                dispatch({
                    type: action.GET_PROFILE,
                    payload: {}
                })
            ).catch(err => {
                // console.log(err)
                if (err.response.data) {
                    const mess = JSON.stringify(err.response.data.message)
                    let error = {}
                    if (mess.match(/log/)) {
                        error.extra = mess
                        dispatch({
                            type: action.GET_ERRORS,
                            payload: error
                        })
                    }
                }
            })
    }
}
export const DeleteAccount = () => dispatch => {
    if (window.confirm('Are you sure to delete your Account?')) {
        axios.delete('/api/v1/profile/deleteAccount')
            .then(res =>{
              Cookies.remove('jwt')
                dispatch(removeProfile())
                dispatch({
                    type: action.SET_CURRENT_USER,
                    payload: {}
                })
            
            
        }
               
            ).catch(err => {
                console.log(err.response)
                if (err.response.data) {
                    const mess = JSON.stringify(err.response.data.message)
                    let error = {}
                    if (mess.match(/log/)) {
                        error.extra = mess
                        dispatch({
                            type: action.GET_ERRORS,
                            payload: error
                        })
                    }
                }
            })
    }
}

export const addExperience=(expData,history)=>dispatch=>{
    axios.post('/api/v1/profile/myExperience',expData)
    .then(res=>{
          history.push('/dashboard')
    }).catch(err=>{
        console.log(err)
        let errors={}
        let msg = JSON.stringify(err.response.data.message.split('.')[0])
        errors=isContain(errors,msg,'company')
        errors=isContain(errors,msg,'location')
        errors=isContain(errors,msg,'from')
        errors=isContain(errors,msg,'discrption')
        
        
        dispatch({
            type: action.GET_ERRORS,
            payload: errors
        })
    })
}
export const addEducation=(expData,history)=>dispatch=>{
    axios.post('/api/v1/profile/myEducation',expData)
    .then(res=>{
        history.push('/dashboard')
    }).catch(err=>{
        console.log(err.response)
        let errors={}
        let msg = JSON.stringify(err.response.data.message.split('.')[0])
        errors=isContain(errors,msg,'college')
        errors=isContain(errors,msg,'location')
        errors=isContain(errors,msg,'from')
        errors=isContain(errors,msg,'degree')
        dispatch({
            type: action.GET_ERRORS,
            payload: errors
        })
    })
}
export const deleteExperience=(id)=>dispatch=>{
    axios.delete(`/api/v1/profile//deleteExperience/${id}`)
    .then(res=>
         dispatch({
             type:action.GET_PROFILE,
             payload:res.data.profile
         })
    ).catch(err=>{
        console.log(err)
       let errors={};
       errors.extra=err.response.data.message
       
        dispatch({
            type: action.GET_ERRORS,
            payload: errors
        })
    })
}
export const deleteEducation=(id)=>dispatch=>{
    axios.delete(`/api/v1/profile/deleteEducation/${id}`)
    .then(res=>
         dispatch({
             type:action.GET_PROFILE,
             payload:res.data.profile
         })
    ).catch(err=>{
        console.log(err.response)
       let errors={};
       errors.extra=err.response.data.message
       
        dispatch({
            type: action.GET_ERRORS,
            payload: errors
        })
    })
}

export const getProfiles=()=>dispatch=>{
    axios.get('/api/v1/profile/all').then(res=>{
        // console.log(res)
        dispatch({
          type:action.GET_PROFILES,
          payload:res.data.profiles  
        })}).catch(err=>console.log(err.response))
}

export const getProfileById=(id)=>dispatch=>{
    dispatch(setProfileLoading())
    axios.get(`/api/v1/profile/profile/${id}`)
    .then(res=>dispatch({
        type:action.GET_PROFILE,
        payload:res.data.profile
    })).catch(err=>dispatch({
        type:action.GET_PROFILE,
        payload:{}
    }))
}