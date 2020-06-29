export default (err,msg,type)=>{
    // msg=JSON.stringify(msg)
    // console.log(msg)
    if (msg.includes(`${type}`)){
        let errmsg = msg
        if (msg.match(/invalid/)) errmsg = errmsg.split(":")[1]
        err[type]= errmsg.replace(/"/, "")
        // console.log(errors)
        console.log(err)
        return err;
    }
    return err
}