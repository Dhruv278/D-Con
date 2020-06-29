const mongoose=require('mongoose');


const PostSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        required:[true,'Please enter Post text'],
        maxlength :[100,'Please create small post'],
        minlength :[1,'Please create long  post']
    },
    name:{
type:String
    },
    photo:String,
    Postphoto:String,
    likes:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User'
            },

        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User'
            },
            text:{
                type:String,
                required:[true,'Please enter comment text']
            },
            name:{
             type:String,

            },
            date:{
                type:Date,
                default:Date.now(),
            },
            photo:String

        }
    ],
    date:{
       type:Date,
       default:Date.now()
    }

        
});


const Post=mongoose.model('Post',PostSchema);
module.exports=Post;