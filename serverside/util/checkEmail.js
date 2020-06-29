const mongoose=require('mongoose');
const User=require('../schema/user');
const catchAsync=require('./catchasync');
const Error=require('./error');
exports.CheckEmail=catchAsync(async(req,res,next)=>{
    // console.log(req.body)
   
    next()
})