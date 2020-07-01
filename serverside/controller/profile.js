const mongoose=require('mongoose');
const catchAsync=require('../util/catchasync');
const Error=require('../util/error');
const Profile=require('../schema/profile')
const User=require('../schema/user');
const Post=require('../schema/post')



exports.createProfile=catchAsync(async(req,res,next)=>{
    let  profileFields={};
    if (req.user.id) profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // console.log(profileFields.skills.length)
    // if(profileFields.skills.length==0)return next(new Error('please enter your skills'))
    
    // console.log('working createProfile')
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    const userProfile=await Profile.findOne({user:req.user.id});
    if(userProfile){
        const updateProfile=await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true,  runValidators:true});
        if(!updateProfile)return next(new Error('Somethi wrong to update profile ,please try again later',404))
        res.status(200).json({
            status:'success',
            Profile:updateProfile
        })
    }else{
        const newProfile=await Profile.create(profileFields);
        if(!newProfile)return next(new Error('Somethi wrong to create profile ,please try again later',404))
        res.status(200).json({
            status:'success',
            Profile:newProfile
        })
    }

})

exports.getProfile=catchAsync(async(req,res,next)=>{
//  console.log(req.user);
    const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','email','photo']);
    // console.log(profile)
    
    if(profile===null){
        // console.log(profile)
        return next(new Error('You Have no profile',401))};

    res.status(200).json({
        profile:profile,
    })
})

exports.createExperience=catchAsync(async(req,res,next)=>{
    const newProfile=await Profile.findOne({user:req.user.id});
if(!newProfile)return next(new Error('Please login again',400))
    const newExp={
        title:req.body.title,
        company:req.body.company,
        location:req.body.location,
        from:req.body.from,
        to:req.body.to,
        current:req.body.current,
        discription:req.body.discription
    };
   await newProfile.experience.unshift(newExp)
  await newProfile.save()
//    console.log(newExp)
   res.status(200).json({
       status:'success',
       profile:newProfile
   })
})


exports.createEducation=catchAsync(async(req,res,next)=>{
    const newProfile=await Profile.findOne({user:req.user.id});
if(!newProfile)return next(new Error('Please login again',400))
    const newEducation={
        college:req.body.college,
        degree:req.body.degree,
        fieldofstudy:req.body.fieldofstudy,
        from:req.body.from,
        to:req.body.to,
        current:req.body.current,
        discription:req.body.discription
    };
    // console.log(newEducation)
   await newProfile.education.unshift(newEducation)
  await newProfile.save()
//    console.log(newProfile)
   res.status(200).json({
       status:'success',
       profile:newProfile
   })
});

exports.deleteExp=catchAsync(async(req,res,next)=>{
    // console.log('reach at delete request ')
    const newProfile=await Profile.findOne({user:req.user.id});
if(!newProfile)return next(new Error('Please login again',400))
   const removeIndex=newProfile.experience.map(item=>item.id).indexOf(req.params.id)
 newProfile.experience.splice(removeIndex,1);
 
  await newProfile.save()
//    console.log(newProfile)
   res.status(200).json({
       status:'success',
       profile:newProfile
   })
})

exports.deleteEdu=catchAsync(async(req,res,next)=>{
    
    const newProfile=await Profile.findOne({user:req.user.id});
if(!newProfile)return next(new Error('Please login again',400))
   const removeIndex=newProfile.education.map(item=>item.id).indexOf(req.params.id)
 newProfile.education.splice(removeIndex,1);

  await newProfile.save()
//    console.log(newProfile)
   res.status(200).json({
       status:'success',
       profile:newProfile
   })
})

exports.deleteProfile=catchAsync(async(req,res,next)=>{
   const userProfile=await Profile.findOneAndRemove({user:req.user.id});
   
   res.status(200).json({
       status:"success"
    })
})

exports.deleteAccount=catchAsync(async(req,res,next)=>{
    const posts=await Post.find()
    posts.forEach(async(post,index)=>{
     
        // console.log(posts)
        if(post.user.toString()===req.user._id.toString()){
            
            await Post.findByIdAndDelete(post._id)
        }
    })
   
    
    const userProfile=await Profile.findOneAndRemove({user:req.user.id});
    const userAccount=await User.findByIdAndDelete(req.user.id)
    res.status(200).json({
        status:"success"
    })
})
exports.getAllProfiles=catchAsync(async(req,res,next)=>{
    const profiles=await Profile.find().populate('user',['name','email','photo']);
         res.status(200).json({
             profiles,
         })
})

exports.getuserProfile=catchAsync(async(req,res,next)=>{
    const profile =await Profile.findById(req.params.id).populate('user',['name','email','photo']);
    res.status(200).json({
        profile,
    })
})