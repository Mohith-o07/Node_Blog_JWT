//all blogs, blog_details,blog_create_get,blog_create_post,blog_delete..
const Blog=require('../models/blog');
const User = require("../models/User");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();

const getUser = async (req) => {
    const token = req.cookies.jwt;
    try {
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedToken.id);
        return user;
    } catch (err) {
        console.error("Error verifying token:", err.message);
        return null;
    }
};

const get_about=(req,res)=>{
    res.render('blogs/about',{title:"about"});
}

const allblogs = async (req, res) => {
    try {
        // Await the user properly
        const user = await getUser(req);  // Assuming getUser() fetches the current user

        const result = await Blog.find().sort({ updatedAt: -1, createdAt: -1 });
        if (!result || result.length === 0) {
            return res.render('blogs/index', { title: 'All Blogs', blogs: [] });
        }
        const filteredBlogs = [];
        // Filter blogs by comparing the hashed value of bloguser
        for (let b of result) {
            const isMatch = await bcrypt.compare(user.email, b.bloguser); // Await bcrypt.compare
            if (isMatch) {
                const blogObject = b.toObject();
                delete blogObject.bloguser; // Exclude the bloguser field
                filteredBlogs.push(blogObject);
            }
        }
        res.render('blogs/index', { title: 'All Blogs', blogs: filteredBlogs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


const blog_details=(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('blogs/details',{blog:result,title:'Blog Details'})
    })
    .catch(err=>res.render('blogs/404',{title:"error"}));
};

const get_update_form = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/update', { blog: result, title: 'Update Blog' });
        })
        .catch(err => res.render('blogs/404',{title:"error"}));
};

 const create_blog=(req,res)=>{
    res.render('blogs/create',{title:"create"});
};

const create_blog_post = async (req, res) => {
    try {
        // Wait for the user to be fetched properly
        const user = await getUser(req);
        console.log(user);
        // Create a new blog post using the user email and request body
        const blog = new Blog({
            bloguser: user.email,  // Ensure that user is correctly populated before using it
            ...req.body
        });
        // Save the blog and redirect to the blogs page
        await blog.save();
        res.redirect('/v1/blogs');
    } catch (err) {
        console.error(err);  // Log errors
        res.status(500).send('Error creating blog post');
    }
};


const update_blog = (req, res) => {
    //console.log(req.body,typeof req.body);
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body, { new: true })
        .then(result => {
            res.json({redirect:'/v1/blogs'});
        })
        .catch(err => {
            console.log(err);
        });
};

 const deleteblog=(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/v1/blogs'});
    })
    .catch(err=>console.log(err))
};
module.exports={
    get_about,
    allblogs,
    blog_details,
    create_blog,
    get_update_form,
    create_blog_post,
    update_blog,
    deleteblog
}