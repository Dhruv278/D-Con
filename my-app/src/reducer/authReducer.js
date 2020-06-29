import * as actionTypes from '../action/types'
import isEmpty from '../validation/isEmpty'
const initialState={
    isAuenticated:false,
    user:{}
};


export default function(state=initialState,action){
 
 switch(action.type){
   case actionTypes.SET_CURRENT_USER:
       return{
           ...state,
           isAuenticated:!isEmpty(action.payload),
           user:action.payload
           
       }
     
     default:
         return state;
 }
}