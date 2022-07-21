const CustomAPIError = require("../errors/custom-error")
const jwt = require("jsonwebtoken")
authorizationMiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('NO token provided',401)
    }
    
    try{
        const token = authHeader.split(' ')[1]
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const{id,username} = decoded
        req.user ={id,username}
        
        next()
    }catch(err){
        throw new CustomAPIError('NOT AUTHORIZED TO ACCESS THIS ROUTE',401)
    }
}
module.exports = authorizationMiddleware