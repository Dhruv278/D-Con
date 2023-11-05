const mongoose=require('mongoose');
const dotenv=require('dotenv'); 
dotenv.config({path: './config.env'});
const app=require(`${__dirname}/app`);

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(con => console.log('database is connected'));





const port=process.env.PORT ||7500;

const server=app.listen(port,()=>{
    console.log(`server is listing on port ${port}`);
})

process.on('SIGTERM',()=>{
  console.log('SIGTERM is working')
  server.close(()=>{
    console.log('process terminated')
  })
})



