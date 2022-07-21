const { NOT_MODIFIED } = require('http-status-codes');
const jwt=require('jsonwebtoken')
const CustomAPIError= require('../errors/custom-error')
const login= async(req,res)=>{
    console.log(req.body)
   const {username,password}= req.body
   if(!username || !password){
        throw new CustomAPIError('Please provide NAME and password',400)
   }
   // creating a new token uses a sign method 
   // sign methods takes three arguments=> 1.A string usually user id (payload) 2.JWT secret key 3. Options like expiresIn
   // we dont send confidential info inside the payload 
   // payload should be kept small as it affects the fastness of the application and affects the user who have slow internet connectivity
   const id= new Date().getDate()
   const token= jwt.sign({id,username}, process.env.JWT_SECRET ,{expiresIn:'1h'})
   res.status(200).json({msg:"USER CREATED",token})
}
const dashboard= async(req,res)=>{
    console.log(req.user)
    const ln=Math.floor(Math.random()*100)
   res.status(200).json({msg:`HELLO ${req.user.username}`,secret:`Your lucky number is ${ln}`})
}

module.exports= {login, dashboard}