import * as action from './types'
import axios from 'axios';
import Cookies from 'js-cookie'
export const registerUser = (userdata, form,history) => dispatch => {
    axios.post('/api/v1/user/signup', form, {

        "Content-Type": "multipart/form-data"
    }).then(res => {
        if (res.data.token) {
            dispatch(SetUser(res.data.user))
           history.push('/dashboard')
        }

    }).catch(err => {
        let errors = {}
        let msg = JSON.stringify(err.response.data.message.split('.')[0])
        // console.log(msg)
        if (msg.match(/mail/)) {
            let errmsg = msg
            if (msg.match(/invalid/)) errmsg = errmsg.split(":")[1]
            errors.email = errmsg;
            // console.log(errors)
        } if (msg.match(/Password/)) {
            let errmsg = msg
            if (msg.match(/invalid/)) errmsg = errmsg.split(":")[1]
            errors.password = errmsg.replace(/"/, ``)
            // console.log(errors)
        }
        if (msg.match(/name/)) {
            let errmsg = msg
            if (msg.match(/invalid/)) errmsg = errmsg.split(":")[1]
            errors.name = errmsg.replace(/"/, "")
            // console.log(errors)
        }

        dispatch({
            type: action.GET_ERRORS,
            payload: errors
        })
    })
}

export const loginuser = (form,history)=> dispatch => {
    axios.post('/api/v1/user/login', form).then(res => {
       
          dispatch(SetUser(res.data.user))
        history.push('/dashboard')

    }).catch(err => {
        // console.log(err)
        let errors = {}
        let msg = JSON.stringify(err.response.data.message.split('.')[0])
        // console.log(msg)
        if (msg.match(/mail/)) {
            let errmsg = msg
            if (msg.match(/invalid/)) errmsg = errmsg.split(":")[1]
            errors.email = errmsg;
            // console.log(errors)
        } if (msg.match(/password/)) {
            let errmsg = msg
            if (msg.match(/invalid/)) errmsg = errmsg.split(":")[1]
            errors.password = errmsg.replace(/"/, ``)
            // console.log(errors)
        }
        if (msg.match(/name/)) {
            let errmsg = msg
            if (msg.match(/invalid/)) errmsg = errmsg.split(":")[1]
            errors.name = errmsg.replace(/"/, "")
            // console.log(errors)
        }

        dispatch({
            type: action.GET_ERRORS,
            payload: errors
        })
    })
}

export const SetUser=user=>{
    return{
        type:action.SET_CURRENT_USER,
        payload:user
    }
}

export const LogoutUser=()=>dispatch=>{
    Cookies.remove('jwt');
    dispatch(SetUser({}))
}