var multer = require('multer')
const Error=require('../util/error');
const sharp=require('sharp');
const USer=require('../schema/user');

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./my-app/public/img/user/")

//   },
//   filename: function (req, file, cb) {
//     // + '-' + Math.round(Math.random() * 1E9)
//     cb(null, Date.now() + '-' + 'user.jpeg')
//   }
// })

let multerStorage=multer.memoryStorage()
  const fileFilter=(req,file,cb)=>{
    
      if(file.mimetype.startsWith('image/')){
          cb(null,true)
      }else{
          cb(new Error('please upload only image not other file',400),false)
      }
  }

let upload = multer({
  storage: multerStorage, 
 fileFilter:fileFilter 
}).single('file')

exports.uploadPhoto=upload
const filter=(obj,...allowedFeilds)=>{
    let newObj={};
    Object.keys(obj).forEach(el=>{
        if(allowedFeilds.includes(el))newObj[el]=obj[el];
    })
    return newObj;
}
exports.resizePhoto=async(req,res,next)=>{
 
    if(!req.file) return next()
    const email=await USer.findOne({email:req.body.email})
    if(email)return next()
  req.file.filename= `${req.body.email}-user.jpeg`;
    sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:80}).toFile(`my-app/build/media/${req.file.filename}`)
    next()
}
exports.resizePhoto2=async(req,res,next)=>{
 
    if(!req.file) return next()
  
    
  req.file.filename= `${Date.now()}-post.jpeg`;
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:80}).toFile(`my-app/build/media/${req.file.filename}`)
    next()
}