import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItems from './postItems'

class PostFeed extends Component {
    state = {  }
    render() { 
        const {posts} =this.props;
        return posts.map(post=><PostItems key={post._id} post={post}/>)
    }
}
 
PostFeed.propTypes={
    posts: PropTypes.array.isRequired
}
export default PostFeed;