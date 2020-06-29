import React, { Component } from 'react';
import PropTypes from 'prop-types'


import CommentItems from './commentItems';
class CommentFeed extends Component {
    
    
    render() { 
        const {comments,postId}=this.props;

        return comments.map(comment=> <CommentItems comment={comment} key={comment._id} postId={postId} />)
    }
}
CommentFeed.propTypes={
    comments:PropTypes.array.isRequired,
    postId:PropTypes.string.isRequired
}
 
export default CommentFeed;