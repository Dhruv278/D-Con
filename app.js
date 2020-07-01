const express=require('express');
const userRoute=require('./serverside/router/user');
const ProfileRoute=require('./serverside/router/profile');
const PostRoute=require('./serverside/router/post');
const app=express();
const globalError=require('./serverside/util/globalError');
var bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const compression =require('compression')
const helmet =require('helmet');
const path=require('path')

// Add this line below
app.enable('trust proxy')
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(express.json({ limit: '10kb' }));
app.use('/api/v1/user' ,userRoute);
app.use('/api/v1/profile',ProfileRoute)
app.use('/api/v1/post',PostRoute);


if(process.env.NODE_ENV==='production'){
   
    app.use(express.static('my-app/build'));
    
    app.use('*',(req,res)=>{
      
       res.sendFile(path.resolve(__dirname,'my-app','build','index.html'))
    //    res.send('hello')/
    })

}
// console.log('app working')

app.use(globalError)
module.exports=app;