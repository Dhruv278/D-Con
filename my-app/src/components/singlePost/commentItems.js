import React, { Component } from 'react';
import  PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteComment} from '../../action/postAction'

class CommentItems extends Component {
onDelete=(e)=>{
    
    const {comment,postId}=this.props;
    this.props.deleteComment(comment._id,postId)
}
    render() { 
        const {comment}=this.props;
        const user=this.props.auth;

        console.log(comment)
        return ( 
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2 commentdiv" >
                  <a href="profile.html">
                    <img className="rounded-circle commentimg d-md-block mb-2" src={require(`../../photo/${comment.photo}`)} alt="" />
                  </a>
                  
        <p className="text-center text-bold">{comment.name}</p>
                </div>
                <div className="col-md-10">
        <p className="lead bordertext"> {comment.text}</p>
               {comment.user._id===user._id?( <div className="m-3">
                    <button className="btn btn-danger" onClick={this.onDelete}>Delete</button>
                </div>):null}
                </div>
              </div>
            </div>
         );
    }
}
CommentItems.propTypes={
    deleteComment:PropTypes.func.isRequired,
    comment:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStatreToProps =state=>({
    auth:state.auth
})
 
export default connect(mapStatreToProps,{deleteComment})(CommentItems);