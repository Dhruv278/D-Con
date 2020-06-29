const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
 
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is require'],
        maxlength:[13,'Please enter short name']
    },
    email:{
        type:String,
        required:[true,'Email must reqire'],
        unique:[true,'This mail id is already Exist'],
     
       
        validate:{
            validator: function(el) {
                return el.match(/^[\w.+\-]+@gmail\.com$/)
              },
              message: 'plaese use gmail or yahoo or hotmail'
        }

    },
    photo:String,
    password:{
        type:String,
        required:[true,'Please enter password'],
        minlength:[6,'Minimun length of Password is 6']
    },
    confirm_password:{
     type:String,
     required:[true,'Please confirm the password'],
     validate:{
             validator:function(el){
                 return el===this.password
             },
             message:'Password is not match with Confirm Password'
     }
    },
    date:{
        type:Date,
        default:Date.now()
    },
    changePasswordAt:{
        type:Date,
    
    },
    passwordToken:String,
    resetPasswordTokenExpireAT:Date,
});

userSchema.pre('save',async function(next){
if(!this.isModified('password')){
    return next();
}
this.password=await bcrypt.hash(this.password,12);
this.confirm_password=undefined;
next(); 
})

userSchema.methods.CheckedPassword=async (insertpass,mainpass)=>{
    return await bcrypt.compare(insertpass,mainpass);
}
userSchema.methods.changedPasswordAfter=(jwtTimeStamp)=>{
    if(this.changePasswordAt){
        const time=parseInt(this.changePasswordAt.getTime()/1000,10);
        return jwtTimeStamp<time;
    }
    return false;
};
userSchema.methods.sendpassTokn=async function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    // convert into crypto from to save safely in database
        this.passwordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
     
    
        this.resetPasswordTokenExpireAT = Date.now() + 10 * 60 * 1000;
        await this.save({validateBeforeSave:false})
        return resetToken;
}

const User=mongoose.model('User',userSchema);
module.exports=User;