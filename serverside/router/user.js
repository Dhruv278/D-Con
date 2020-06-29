const express=require('express');
const router=express.Router();
const authentication=require('./../controller/authentication');
const uploadPhoto=require('../controller/multer');
const EmailCheck=require('../util/checkEmail');
router.post('/signup',uploadPhoto.uploadPhoto,uploadPhoto.resizePhoto,authentication.signup)
router.post('/login',authentication.login)
// console.log('user working')

module.exports=router