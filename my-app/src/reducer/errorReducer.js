import * as types from './../action/types'



export default function(state={},action){
 switch(action.type){
   case types.GET_ERRORS:
       return action.payload;
     default:
         return state;
 }
}