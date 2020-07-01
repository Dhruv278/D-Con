const catchAsync=require('./../util/catchasync');
const mongoose=require('mongoose');
const User=require('./../schema/user');
const jwt=require('jsonwebtoken');
const error=require('./../util/error')
const { promisify } = require('util')

const SignupToken = user => {

    return jwt.sign({user}, process.env.JWTSECRET, {
        expiresIn: process.env.EXPIRE_TIME
    })
};

const sendtoken=async (req,res,statuscode,user)=>{
    const token=await SignupToken(user)
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.EXPIRE_TIME * 24 * 60 * 60 * 1000),
        // httpOnly: true,
        // secure: req.secure || req.headers['x-forwarded-photo'] ==='https'
    });
   
    res.status(statuscode).json({
        token:token,
        user,
    })
}

exports.signup=catchAsync(async(req,res,next)=>{
    if(req.body.file===null){filename='https://firebasestorage.googleapis.com/v0/b/dcon-1ec91.appspot.com/o/images%2Fdefault.jpg?alt=media&token=f878dfe0-3549-4c04-aaa9-6c9294a2941a'}
    else{filename=req.body.file}
// console.log(req.body.file)
    const newUser= await User.create({
        name:req.body.name,
        email:req.body.email,
        photo:filename,
        password:req.body.password,
        confirm_password:req.body.confirm_password
    });
    // console.log(newUser)
    sendtoken(req,res,200,newUser)
});

exports.login=catchAsync(async (req,res,next)=>{
//   console.log(req.cookies)
    const { email,password }=req.body;

    if(!email || !password)return next(new error('Please Enter email or password'),401);
    

    const user = await User.findOne({ email:email }).select('+password')
    
if(!user)return next(new error('You enter wrong email id',400))
    // 2 check the email or passwor is coreect or not 
//   console.log(await user.CheckedPassword(password, user.password))
    if (
        !user ||
        !(await user.CheckedPassword(password, user.password))
    ) return next(new error('you enter wrong password', 401));
   
    // console.log(req.headers)
    sendtoken(req,res,200,user)
});

exports.checktoken=catchAsync(async(req,res,next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies.jwt){
        token=req.cookies.jwt;
    }
    // console.log(token);
    
    if (!token) return next(new error('you are not logged in please log in first ', 401))
    
    
    
    // console.log('end');
    // 2 check the token with secret string
    
    
    const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET);
    // console.log(decoded)
    // find the data of customer whose id in payload
    let currentUser = await User.findById(decoded.user._id);
    // console.log(currentUser)
    
    //check the current user is exixst or not and check the token is right or not
    if (!currentUser) return next(new error('the token is not valid or not existing please log in again', 401))
    // checked that the password is changed or not
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new error('User recently changed password! Please log in again.', 401)
        );
    }
    
    req.user = currentUser;
    next()

});


exports.forgotpssword=catchAsync(async(req,res,next)=>{
    const { email }=req.body;
    const user=await User.findOne({ email });
    if(!user)return next(new error('The email not exist, please cheack your email id',401))

  const resettoken= await user.sendpassTokn();
  
  try{
  const url=`${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
  res.status(200).json({
      status:'success'
  })}catch(err){
    user.passwordToken = undefined;
    user.resetPasswordTokenExpireAT = undefined;
    user.save({ validateBeforeSave: false });
    return next(new error('somthing is wrong please click again on send', 500))
  }
})