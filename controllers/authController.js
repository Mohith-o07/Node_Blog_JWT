const User = require("../models/User");
const jwt=require('jsonwebtoken');

//handle errors..
const handleErrors=(err)=>{
    console.log(err,err.message,err.code);
    let errors={};

    //duplicate error code..
    if(err.code===11000){
        errors.email='this email already exists in the database';
        return errors;
    }
    //validation errors..
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        });
        return errors;
    }
    if(err.message==='minimum password length is 6 characters'){
        errors.password=err.message;
    }
    //incorrect email.. //check statics.login function in user.js..
    if(err.message==='incorrect email'){
        errors.email='this email ain\'t registered or it is incorrect';
    }
    //incorrect password..
    if(err.message==='incorrect password'){
        errors.password='the password is incorrect';
    }
    return errors;
}
const maxAge=5*60;
const createToken=(id)=>{
    return jwt.sign({id},'mohitheswar paida',{
        expiresIn:maxAge  //in seconds..
    });
}

const signup_get=(req,res)=>{
    res.render('auth/signup');
}

const login_get=(req,res)=>{
    res.render('auth/login');
}

const signup_post=async(req,res)=>{
    const {email,password}=req.body;
    
    try{
        const user=await User.create({email,password});
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000,secure:true});
        res.status(201).json({user:user._id});
    }
    catch(err){
        const errors=handleErrors(err);
        //console.log(typeof(err.message));
        res.status(400).json({errors});
    }
}

const login_post=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.login(email,password);
        const token=createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000,secure:true});
        res.status(200).json({user:user._id});
    }
    catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors});
    }
}

const logout_get=(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/v1/auth/blogs/login');
}
module.exports={
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get
}