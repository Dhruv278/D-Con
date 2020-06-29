import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from '../../action/postAction'
import TextArea from '../commen/TextArea'

class CommentForm extends Component {
 constructor(props){
     super(props);
     this.state={
         text:'',
         errors:'',
        
     }
 }
 onChange=(e)=>{
     this.setState({[e.target.name]:e.target.value})
 }
 onSubmit=(e)=>{
     e.preventDefault()
     const newComment={
         text:this.state.text
     }
     this.props.addComment(this.props.postId,newComment)
 }
 
 componentWillReceiveProps(nextProps){
     if(nextProps.errors){
         this.setState({errors:nextProps.errors})
     }
 }
    render() { 
        const {errors}=this.state;
        return ( 
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Somthing on this Post...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                   <TextArea 
                   placeholder="Make a Comment"
                   name="text"
                   value={this.state.text}
                   onChange={this.onChange}
                   error={errors.text}
                   />
                  </div>
                 
                  <button type="submit" className="btn btn-dark">Done</button>
                </form>
              </div>
            </div>
          </div>
         );
    }
}

CommentForm.propTypes={
    addComment:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired
}
 const mapstateToProps=state=>({
     auth:state.auth,
     errors:state.errors
 })
export default connect(mapstateToProps,{ addComment })(CommentForm);