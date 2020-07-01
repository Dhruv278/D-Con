const catchAsync = require("../util/catchasync");
const Error = require('../util/error');
const Post = require('../schema/post');
const User = require('../schema/user');
const fs=require('fs')

exports.createPost = catchAsync(async (req, res, next) => {
    if(req.body.file===null){filename=null}
    else{filename=req.body.file}
    const newPost = await Post.create({
        user: req.user.id,
        photo:req.user.photo,
        name: req.user.name,
        text: req.body.text,
        Postphoto:filename

    })
    
    res.status(200).json({
        status: 'success',
        post: newPost
    })

})

exports.getAllPost = catchAsync(async (req, res, next) => {

    const posts = await Post.find().sort({ date: -1 }).populate('user',['name'])

    res.status(200).json({
        status: 'success',
        posts,
    })
})

exports.getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findOne({ _id: req.params.id }).populate('user',['name'])

    if (!post) return next(new Error('There is no post with this id', 400))

    res.status(200).json({
        status: "success",
        post,
    })


})

exports.deletePost = catchAsync(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
      
    if (!post) return next(new Error('There is no post with this id', 400))
    if (req.user.id.toString() !== post.user.toString()) return next(new Error('you cannot delete this post'));
      
    await post.remove();
    res.status(200).json({
        status: 'success'
    })
})
exports.likePost = catchAsync(async (req, res, next) => {

    const post = await Post.findById(req.params.id);
console.log('working')
    if (!post) return (new Error('There is no post with this id', 400))

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) return next(new Error('you already like this post', 401))

    post.likes.unshift({ user: req.user.id });
    await post.save()

    res.status(200).json({
        status: 'success',
        post,
    })


})

exports.unlikePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return (new Error('There is no post with this id', 400));
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) return next(new Error(`you already don't like this post`, 401))
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    post.save();

    res.status(200).json({
        status: 'succes',
        post,
    })

});

exports.commentPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new Error('There is no post with this id', 400));
    const newComment = {
        user: req.user.id,
        text: req.body.text ,
        name: req.user.name,
        photo:req.user.photo
    };
    post.comments.unshift(newComment);
    await post.save()

    res.status(200).json({
        status: 'success',
        post,
    })
})

exports.deleteComment = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new Error('There is no post with this id', 400));
    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) return next(new Error('there is no comment with this id',
        400));
const removeIndex=post.comments.map(comment=>comment._id).indexOf(req.params.comment_id);
post.comments.splice(removeIndex,1);
await post.save()
res.status(200).json({
    status:'success',
    post,
})
})