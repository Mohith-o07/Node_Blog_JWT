const jwt=require('jsonwebtoken');
const User = require('../models/User');

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    console.log(token);
    if(token){
        jwt.verify(token,'mohitheswar paida',(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/v1/auth/blogs/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/v1/auth/blogs/login');
    }
}

//check current user..
const checkUser=(req,res,next)=>{  //to render email to header partial..
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'mohitheswar paida',async(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null;
                next();
            }else{
                console.log("authMiddleware",decodedToken);
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