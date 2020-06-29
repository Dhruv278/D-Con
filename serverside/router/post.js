const express=require('express');
const router=express.Router();
const authentication=require('../controller/authentication')
const PostHandler=require('../controller/post');
const multer =require('./../controller/multer')


router.get('/getAllPost',PostHandler.getAllPost)
router.get('/getPost/:id',PostHandler.getPost)
router.use(authentication.checktoken);
router.post('/createPost',multer.uploadPhoto,multer.resizePhoto2,PostHandler.createPost)
router.delete('/deletePost/:id',PostHandler.deletePost);
router.post('/like/:id',PostHandler.likePost);
router.post('/unlike/:id',PostHandler.unlikePost);
router.post('/comment/:id',PostHandler.commentPost);
router.delete('/deletecomment/:id/:comment_id',PostHandler.deleteComment);


module.exports=router;