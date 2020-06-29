import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {getPost} from './../../action/postAction'
import {connect} from 'react-redux'
import PostItems from '../post/postItems'
import Spinner from '../commen/spiner'
import { Link } from 'react-router-dom';
import CommentForm from './commentForm'
import CommentFeed from './commentFeed';
class SinglePost extends Component {
    componentDidMount(){
        this.props.getPost(this.props.match.params.id)
    }
    render() { 
        const {post,loading} =this.props.post;
        let postContent;
        if(post===null || loading || Object.keys(post).length ===0){
            postContent=<Spinner />
        }else{
            postContent=(
                <div>
                    <PostItems post={post} showAction={false} />
                     <CommentForm postId={post._id} />
                     <CommentFeed comments={post.comments} postId={post._id} />
                 </div>
            )
        }
        
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/post" className="btn btn-secondary mb-3">Back</Link>
                        
                {postContent}</div>
                    </div>
                </div>
            </div>
          );
    }
}
SinglePost.propTypes={
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}
 const mapStateToProps=state=>({
     post:state.post
 })
export default connect(mapStateToProps,{getPost})(SinglePost) ;