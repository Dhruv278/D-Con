import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';
import {deletePost,addLike,unLike} from '../../action/postAction'

class PostItems extends Component {
    state = {  }
    deletepost=(id)=>{

       this.props.deletePost(id)
    }
    like=(id)=>{

      this.props.addLike(id)
    }
    unlike=(id)=>{
      this.props.unLike(id)
    }
    findUserLike(likes){
      const {auth}=this.props;
      if(likes.filter(like=>like.user === auth.user._id).length>0){
        return true
      }else{
        return false
      }
    }
    render() { 
        const {post}=this.props
        const {user}=this.props.auth;
        const {showAction}=this.props;
       
        let componet
        try{
          componet= (!isEmpty(post.Postphoto)?( <img src={post.Postphoto} className="postimg m-2" alt="User posted picture"></img>):null)
       }catch(err){window.location.reload()}
        return ( 
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" alt="pic of user" src={post.photo} alt="" />
                  </a>
                  <br />
       <p className="text-center"> <strong >{post.name}</strong> </p>
                </div>
                <div className="col-md-10">
        <p className="lead">{post.text}</p>
        <div>
        {componet}
        </div>
         {showAction ? (<span>
          <button type="button" className="btn btn-light mr-1" onClick={()=>this.like(post._id)}>
                    <i className={classnames('fas fa-thumbs-up',{
                      'text-info':this.findUserLike(post.likes)
                    })} ></i>
        <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button type="button" className="btn btn-light mr-1"  onClick={()=>this.unlike(post._id)}>
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                
                  {post.user.toString() === user._id.toString() ?(
                       <button type="button" className="btn btn-danger mr-1" onClick={()=>this.deletepost(post._id)}>
                       <i className="fas fa-times" />
                     </button> 
                  ):null}
         </span>):null}
                 
                </div>
              </div>
            </div>
         );
    }
}
PostItems.defaultProps={
  showAction:true
}
 PostItems.propTypes={
     deletePost:PropTypes.func.isRequired,
     post:PropTypes.object.isRequired,
     auth:PropTypes.object.isRequired,
     addLike:PropTypes.func.isRequired,
     unLike:PropTypes.func.isRequired
 }
 const mapStateToProps=state=>({
     auth:state.auth
 })
export default connect(mapStateToProps ,{deletePost,addLike,unLike})(PostItems);