const Error = require("./error");
const HandleValidation = (err) => {
    const errors = Object.values(err.errors).map(el => el.message)
    err.message = `invalid input:${errors.join('. ')}`
    return new Error(err.message, 400)

}
const HandleDuplicateFeild = (err) => {
   
    str = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
    // console.log(str);
    err.message = `Duplicate value ${str}`
    return new Error(err.message, 404)

}

const HandlerForID = (err) => {
    err.message = `invalid ${err.path}:${err.value}`
    return new Error(err.message, 404)
}

const HandleInavalidToken = () => {
    return new Error('pleasecheck the token or enter token properly', 400)
}

const sendErrorPro = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOprational) {
        return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
                
            });
        }
      return res.status(err.statusCode).json( {
            
                msg: err.message
            })
        }
    


        if (err.isOprational) {
           return res.status(err.statusCode).json({

               msg: err.message
           })
            
        }
        return res.status(err.statusCode).json({
                title: 'somthing went wrong',
                msg: err.message
            })
        
   
}

const sendErrorDev = (err, req, res) => {

    if (req.originalUrl.startsWith('/api')) {
       return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });
    } else {
       return res.status(err.statusCode).json('error', {
            title: 'somthing went wrong',
            msg: err.message
        })
    }
}


module.exports = (err, req, res, next) => {

    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message=err.message
        if (err.name === 'CastError') error = HandlerForID(error);
        if (err.code === 11000) error = HandleDuplicateFeild(error);
        if (err.name === 'ValidationError') error = HandleValidation(error);
        if (err.name === 'JsonWebTokenError') error = HandleInavalidToken();
        // console.log(err.statusCode)
        
        sendErrorPro(error, req, res)

    } else if (process.env.NODE_ENV === 'devlopment') {

        sendErrorDev(err, req, res)
    }

}