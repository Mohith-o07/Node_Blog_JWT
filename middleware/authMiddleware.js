const jwt=require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const requireAuth=(req,res,next)=>{
    const excludedPaths = ['/v1/auth/blogs/login','/v1/auth/blogs/signup','/v1/auth/blogs/logout'];
    if (excludedPaths.includes(req.path)) {
      return next(); // Skip checkUser for these paths
    }
    const token=req.cookies.jwt;
    console.log(token);
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/v1/auth/blogs/login');
            }else{
                next();
            }
        })
    }
    else{
        return res.redirect('/v1/auth/blogs/login');
    }
}

//check current user..
const checkUser=(req,res,next)=>{  //to render email to header partial..
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null;
                next();
            }else{
                let user=await User.findById(decodedToken.id);
                res.locals.user=user;  //views local data..
                next();
            }
        })
    }
    else{
        res.locals.user=null;
        next();
    }
}

module.exports={requireAuth,checkUser};